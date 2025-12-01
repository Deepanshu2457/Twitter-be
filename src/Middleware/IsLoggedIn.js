const jwt = require("jsonwebtoken")
const {User} = require("../Models/userSchema")
const isLoggedIn = async (req,res,next)=>{
    try {
        const {loginToken} = req.cookies
        // console.log(loginToken)
        const originalObject = jwt.verify(loginToken,process.env.JWT_SECRET)

    const foundUser = await User.findOne({_id : originalObject.id})
    if(!foundUser){
        throw new Error("please login")
    }

    req.user = foundUser
    next()

    }
    catch (error) {
        res.status(400).json({error : "please log in"})  
    }

}

module.exports = {
    isLoggedIn
}