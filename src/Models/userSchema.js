const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname : {

    },
    lastname : {

    },
    username : {

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