const express = require("express")
const {VerifiedMail} = require("../Models/varifiedmail.schema")
const {User} = require("../Models/userSchema")
const router = express.Router()

const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")


router.post("/signup" ,async (req,res)=>{
    try {
        const {firstName, lastName, username, mail, password ,dateOfBirth} = req.body
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
        const createUser = await User.create({firstName,lastName,username,mail, password :hashPassword  , dateOfBirth})
            
        res.status(201).json({message : "signup sucessfully " })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
} )


router.post("/signin", async (req,res)=>{
    try {
        const {username,password} = req.body
        
        const foundUser = await User.findOne({username})
        if(!foundUser){
            throw new Error("user does not exist")
        }
        const flag = await bcrypt.compare(password, foundUser.password)
        if(!flag){
            throw new Error("password incorrect")
        }

        const token = await jwt.sign({id:foundUser._id}, process.env.JWT_SECRET)

        const {firstName,lastName,username : un, profilePicture, bio,followers,following,post,dateOfBirth}=foundUser
        res.cookie("LoginToken",token,{maxAge : 24 * 60 * 60 * 1000}).status(200).json({msg : "done",
         data : {firstName, lastName, username : un, profilePicture, bio, followers, following, post, dateOfBirth}})

      
        
    } catch (error) {
        res.json({message:error.message})
    }
})

module.exports= {authRouter : router}