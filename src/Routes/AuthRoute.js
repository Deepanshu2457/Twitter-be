const express = require("express")
const {VerifiedMail} = require("../Models/varifiedmail.schema")
const {User} = require("../Models/userSchema")
const router = express.Router()

const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")


router.post("/signup" ,async (req,res)=>{
    try {
        const {firstname, lastname, username, mail, password ,dateOfBirth} = req.body
        const foundUser= await User.findOne({
            $or : [
                {mail}, {username}
            ]
        })
        if(!foundUser){
            throw new Error(" Already user exist / please try changing your username and Email")
        }

        const isVerfiedMail = await VerifiedMail.findOne({mail})
        if(!isVerfiedMail){
            throw new Error("please verify your email first")
        }

        const isPasswordStrong = validator.isPasswordStrong(password)
        if(!isPasswordStrong){
            throw new Error("Please enter a strong password")
        } 
        const hashPassword = await bcrypt.hash(password , 10)
        const createUser = await User.create({firstname,lastname,username,mail,hashPassword : password , dateOfBirth})
            
        res.status(201).json({message : "signup sucessfully " })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
} )


// router.post("/signin", async (req,res)=>{
//     try {
//         const {username,password} = req.body
        
//         const foundUser = await User.findOne({username})
//         console.log(foundUser)
//         if(!foundUser){
//             res.json({message:"user not found"})
//         }

//         res.json(foundUser)
        
//     } catch (error) {
//         res.json({message:error.message})
//     }
// })

module.exports= {authRouter : router}