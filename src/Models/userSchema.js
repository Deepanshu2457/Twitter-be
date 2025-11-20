const mongoose = require("mongoose")

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
        trim : true

    },
    mail : {

    },
    password : {

    },
    dateOfBirth : {

    },
    post : [],
    followers : [],
    following : [],
     bio : {

     },
     profilePicture : {

     },

})


const User = mongoose.model("user", userSchema)

module.exports={
    User
}