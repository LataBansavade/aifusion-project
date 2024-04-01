
const express = require('express')
require("dotenv").config();
const clc = require("cli-color");
const mongoose = require("mongoose");
const cors = require('cors');

const aiSummrize = require('./utils/aiSummrize'); 
const aiCode = require('./utils/aiCode');
const aiDoubt = require('./utils/aiDoubt');

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
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//         console.log(clc.bgBlue.underline("connected to MONGODB"));
// })
// .catch((error)=>{
//    console.log(error);
// })


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
  
/////////////////////////////////////////////////////////////////////////////////////////////////
// logout

app.get('/logout', async function(req,res){
    res.clearCookie('token')
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