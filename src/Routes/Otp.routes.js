const express=require("express")
const router=express.Router()
const nodemailer=require("nodemailer")
const {otpLimiter} = require("../Middleware/OtpRateLimiter")
const {VerifiedMail} = require("../Models/varifiedmail.schema")
const {OTP} = require("../Models/Otp.schema")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : "sharmaindycall@gmail.com",
        pass : process.env.PASSWORD
    }
})

router.post("/otp/send-otp",otpLimiter,async (req,res)=>{
    try {
        const {mail} = req.body
        let otp = String(Math.floor(Math.random() * 1000000)).padEnd(6,"7")
        await OTP.create({email,otp})

        await transporter.sendMail({
            from : '"Deepanshu" Sharmaindycall@gmail.com',
            to : mail,
            subject : "OTP",
            html : `<h1>Nikita</h1>`

        })

        res.status(201).json({
            message : "complete",
            otp
        })


        
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
})

   router.post("/otp/verify-otp", async  (req,res)=>{
    try {
        const {otp,email} = req.body
        const foundObject = await OTP.find({
            $and : [
                {otp} , {email}
            ]
        })
        if(!foundObject){
            throw new Error(" Un-macthed Email / Otp")
        }
        await VerifiedMail.create({email})
     res.status(201).json({msg : "User has Verfied"  })        
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
   })

module.exports={
    otpRoutes:router
}