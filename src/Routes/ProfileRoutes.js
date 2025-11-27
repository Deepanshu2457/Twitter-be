const express = require("express")
const {isLoggedIn}  = require("../Middleware/IsLoggedIn")
const {User} = require("../Models/userSchema")

const router = express.Router()

router.patch("/profile/edit", isLoggedIn, async (req,res)=>{
    try {
        const userId = req.user._id
        const {firstName,lastName,bio,profilePicture} = req.body
        const updateProfile = await User.findByIdAndUpdate(userId,{firstName,lastName,bio,profilePicture}, {new :true}).select("firstName lastName username bio profilePicture dateOfBirth post follower following ")

        res.status(200).json({mesaage : "done", data : updateProfile})
    } catch (error) {
        res.status(400).json({error:error.message})
    }

})


router.patch("/profile/follow/:id", isLoggedIn, async(req,res)=>{
    try {
            const userTobeFollow = await User.findById(req.params.id)
    if(!userTobeFollow){
        throw new Error("user not found")
    }

    req.user.following.push(userTobeFollow)
    await req.user.save()

    userTobeFollow.followers.push(req.user)
    await userTobeFollow.save()

    res.status(200).json({message: " done"})
        
    } catch (error) {
        res.status(200).json({error : error.message})
        
    }

})

router.patch("/profile/unfollow/:id",isLoggedIn , async (req,res)=>{
    try {
    const usertoBeUnFollow = await User.findById(req.params.id)
    if(usertoBeUnFollow){
        throw new Error("user not found")
    }

    const filterdFollower = usertoBeUnFollow.followers.filter((item)=>{
        return item.toString() != req.params.id
    })
    req.user.followers = filterdFollower
    await req.user.save()

    const filterdFollowing = usertoBeUnFollow.following.filter((item)=>{
        return item.toString() != req.params.id
    })
        req.user.following = filterdFollowing
        await req.user.save()

        res.status(200).json({message : "done"})
    } catch (error) {
        res.status(400).json({error : error.message})
    }

})

module.exports={
    ProfileRoutes : router
}