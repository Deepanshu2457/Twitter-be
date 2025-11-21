const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required : true,
        maxlength : 20,
        minlength : 2,
        trim: true
    },
    lastname : {
           type:String,
        required : true,
        maxlength : 20,
        minlength : 2,
        trim: true

    },
    username : {
           type:String,
        required : true,
        maxlength : 20,
        minlength : 2,
        trim : true,
        unique : true,
        immutable : true

    },
    mail : {
        type : String,
        required : true,
        validate : (val)=>{
            const isEmail = validator.isEmail(val)
            if(!isEmail){
                throw new Error("invalid Email")
            }
        },
     unique : true,
     trim : true,
     immutable : true


    },
    password : {
        type : String,
        required : true

    },
    dateOfBirth : {
        type : String,
        required : true,
         trim : true,
         validate : (val)=>{
            const isDateValid = validator.isDateValid(val)
            if(!isDateValid){
                throw new Error(" Invalid Date, use YYYY/MM/DD or YYYY-MM-DD")
            }
         }

    },
    post : [{ type : mongoose.Types.ObjectId, ref : "post"}],
    followers : [],
    following : [],
     bio : {
        type:String,
        maxlength : 100,
        trim : true 

     },
     profilePicture : {
        type : String,

     },

}, {timestamps : true})


const User = mongoose.model("user", userSchema)

module.exports={
    User
}