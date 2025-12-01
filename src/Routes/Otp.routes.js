
const express=require("express")
const router=express.Router()
const nodemailer=require("nodemailer")
const {otpLimiter} = require("../Middleware/OtpRateLimiter")
const {VerifiedMail} = require("../Models/varifiedmail.schema")
const {OTP} = require("../Models/Otp.schema")
// const {VerifiedMail} = require("../Models/varifiedmail.schema")



const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : "sharmaindycall@gmail.com",
        pass : process.env.EMAIL_PASSWORD
    }
})

router.post("/otp/send-otp",otpLimiter,async(req,res) => {
    try {
        const {mail} = req.body
        const foundMail = await VerifiedMail.findOne({mail})
        if(foundMail)
        {
            throw new Error("Email already verified")
        }


        let otp = String(Math.floor(Math.random() * 1000000)).padEnd(6, "0")
        await OTP.create({otp,mail})
        console.log(otp)

        // await transporter.sendMail({
        //     from : ' "Deepanshu" sharmaindycall@gmail.com',
        //     to : mail,
        //     subject : "OTP",
        //     html : `<h1>Nikita ${otp}</h1>`

        // })

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
        const {otp,mail} = req.body
        const foundObject = await OTP.find({
            $and : [
                {otp} , {mail}
            ]
        })
        if(!foundObject){
            throw new Error(" Un-macthed Email / Otp")
        }
        await VerifiedMail.create({mail})
     res.status(201).json({msg : "User has Verfied"  })        
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
   })

module.exports={
    otpRoutes:router
}