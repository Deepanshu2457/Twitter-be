const mongoose=require("mongoose")
const validator = require('validator')
const otpSchema= new mongoose.Schema({
    otp:{
        type:String,
        required:true,
        minlength:6,
        maxlength:6

    },
    email:{
        type:String,
        required:true,
        validate:  (val)=>{
            const isEmail= validator.isEmail(val)
            if(!isEmail){
                throw new Error("invalid mail")
            }
        }

    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:120

    }

})

const OTP = mongoose.model("OTP", otpSchema)

module.exports={OTP}
