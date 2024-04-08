
const express = require('express')
require("dotenv").config();
const clc = require("cli-color");
const mongoose = require("mongoose");
const cors = require('cors');
const bcrypt = require('bcrypt');

const aiSummrize = require('./utils/aiSummrize'); 
const aiCode = require('./utils/aiCode');
const aiDoubt = require('./utils/aiDoubt');
const {validateData} = require('../server/utils/authUtils') 
var validator = require('validator');

const saveChatModel = require('./models/saveChatModel');
const userModel = require('./models/userModel');

const OpenAI= require('openai');
const openai = new OpenAI({
    apiKey:`${process.env.OPENAI_API_KEY}`,
})


// VARIABLES
const app = express();
const PORT =  process.env.PORT || 5000;


// Middlewares
app.use(express.urlencoded({ extended: true })); //this is used for form data
app.use(express.json()); // this is used for hitting req from anywhere like postman
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))


// Db Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
        console.log(clc.bgBlue.underline("connected to MONGODB"));
})
.catch((error)=>{
   console.log(error);
})


app.get('/', function (req, res) {
    res.send('Hello World ###')
    console.log("this is home Page")
  })

////////////////////////////////////////////////////////////////////////////////////////
// summary Api

app.post('/aiSummrize',async function (req, res) {
    console.log('aiSummrize api is running');
    const {textInput} = req.body;
    try {
      const summary = await aiSummrize(textInput);
    //   console.log("summary is" , summary);
      res.send({summary});
    } catch (error) {
      res.send({error: error})
      console.log("error while getting summary" , error);
    }
    
  })

////////////////////////////////////////////////////////////////////////////////////////////////
//code Api

app.post('/aiCoded',async function (req, res) {
    const {quesInput,language} = req.body;
    try {
      const ansCode = await aiCode(quesInput,language);
      res.send({ansCode});
    //   console.log("answewr code is>>>" , ansCode)
    } catch (error) {
      res.send({error: error})
      console.log("erropr while getting code from AI");
    }
    
  })

// /////////////////////////////////////////////////////////////////////////////////////
//Pdf 

app.post('/aiPdfDoubt',async function (req, res) {
    const { pdfContent, question } = req.body;
    try {
      const ansToDoubt = await aiDoubt( pdfContent, question );
      res.send({ansToDoubt});
    } catch (error) {
      res.send({error: error})
    }
    
  })

  // //////////////////////////////////////////////////////////////////////////////////////

// chat
app.post('/saveChat', async (req,res)=>{
  try {
      const { allMessages } = req.body;
      // Save all messages to MongoDB
      await saveChatModel.insertMany(allMessages, { ordered: false }); //We use insertMany() to save all messages to the database. The { ordered: false } option tells MongoDB to continue inserting documents even if errors occur, allowing us to ignore duplicates.
      res.status(200).send({ message: 'Messages saved successfully' });
  } 
  catch (error) {
      /*
          In MongoDB, when you attempt to insert a document with a field value that 
          violates a unique index constraint, MongoDB will throw a duplicate key error. 
          This error has a specific error code associated with it, which is 11000. 
      */
      if (error.code === 11000) { // Duplicate key error code
          console.error('Duplicate message detected:', error);
          res.status(400).send({ error: 'Duplicate message' });
      }
      else {
          console.error('Error saving messages:', error);
          res.status(500).send({ error: 'Internal server error' });
      }
  }
})

// chat : previous chats
app.get('/getAllChats', async (req, res) => {
  try {
      const allChats = await saveChatModel.find();
      res.status(200).send(allChats);
  } catch (error) {
      console.error('Error fetching all chats:', error);
      res.status(500).send({ error: 'Internal server error' });
  }
});



// /////////////////////////////////////////////////////////////////////////////
// Image

app.post('/genImg', async(req,res)=>{
  const {  prompt } = req.body
  console.log('prompt is : ',prompt);

  const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
  });

  // image_url = response.data.data[0].url;
  console.log(response.data[0].url);


  res.send({
      myPromt : prompt,
      aiImageURL : response.data[0].url
  })
})



// ////////////////////////////////////////////////////////////////////////////////////////////////////
//login

app.post('/login', async function(req,res){
  const {username, password} = req.body
 
 //  console.log('username', username);
 //  console.log('password', password);
 
 // find user in database
 try {
       let userData =  await userModel.findOne({username: username})
 
       if(!userData) {
          return res.send({
           status :400,
           message : "Invalid username",
           noUser : true
 
          })
       }
 
       //hash password verify
       const isMatched = await bcrypt.compare(password, userData.password);
 
       if(!isMatched){
         return res.send({
           status :400,
           message : "password does not match",
           wrongPassword : true
       })
       }
 
      //  const token = jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: '10m' });
      //  console.log("token is", token);
      //  res.cookie('token', token, { maxAge: 600000, httpOnly: true, sameSite: 'None', secure: true });
 
 
 
       return res.send({
         status : 200,
         message : "Login successful",
         loginSuccess : true
       })
 
 } catch (error) {
       return res.send({
         status : 404,
         message : "Database error",
         error : error,
         dataBaseError : true
       })
 }
 })


// //////////////////////////////////////////////////////////////////////////////////////////

app.post('/register', async function(req, res) {
  console.log('Registeration Api is running');
  const { name, email, username, password } = req.body;
  try {
    const data = await validateData(name, username, password, email);
    //check if email and username already exist or not
    const usernameAlreadyExist = await userModel.findOne({username})
    if(usernameAlreadyExist){
        return res.send({
            status: 400,
            message: "Username already exists",
            alreadyUser: true
        });
    }

    // Password Bcrypt
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    // Saving Data in database
    const userData = new userModel({
      name: name,
      email: email,
      username: username,
      password: hashPassword,
    });

    await userData.save();

    res.send({
      status: 200,
      successful : true,
      message: "Registration successful"
    });
    console.log("Registration successful");
  } catch (error) {
    console.log(error);
    res.send({ status: 404, err: error,message: error.message });
  }
});




  
/////////////////////////////////////////////////////////////////////////////////////////////////
// logout

app.get('/logout', async function(req,res){
    // res.clearCookie('token')
    console.log("logout here")
    res.send({
      status : 200,
      logoutSuccess : true,
      message : "Logout successful"
    })
  })
/////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT,()=>{
    console.log(clc.white.bgGreen.underline(`Server running on port ${PORT}`));
})