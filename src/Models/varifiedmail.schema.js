const mongoose=require("mongoose")
const validator = require("validator")

const varifiedSchema = new mongoose.Schema({
    mail:{
        type:String,
        required:true,
        validate: (val)=>{
            const isEmail= validator.isEmail(val)
            if(!isEmail){
                throw new Error("invalid mail / try again")
            }
        }
    }
},   { timestamps:true })

const VerifiedMail = mongoose.model("verifiedMail", varifiedSchema)

module.exports={VerifiedMail}