
var validator = require('validator')

const validateData = (name, username, password, email) => {
  return (
    new Promise((resolve , reject)=>{

        if(!name || !username || !password || !email){
            reject("Creadentails is missing")
        }
        if(typeof name !== "string" || typeof username !== "string"  || typeof password !== "string"  || typeof email !== "string"  ){
            reject("values must be a string")
        }
        if(password.length < 0 || password.length > 8 ){
            reject("password must be greater than 0 and less than 8 characters")    
        }
        
        if(!validator.isEmail(email)){
             reject("email is not valid")
        }
        if(!validator.isAlphanumeric(password)){
            reject("password is not valid")
        }
        resolve();
    })

    )
  
}

module.exports = {validateData};