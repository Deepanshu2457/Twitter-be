const express=require("express")

const router = express.Router()
const { isLoggedIn } = require("../Middleware/IsLoggedIn")
const { isAuthor } = require("../Middleware/IsAuthor")
const {Post} = require("../Models/postSchema")
const {User} = require("../Models/userSchema")



router.post("/post", isLoggedIn, async(req,res)=>{
    try {
        const {caption , image} = req.body
        if( !image && !caption){
            throw new Error(" Please provide either caption or image")
        }
        const createPost = await Post.create({ image , caption , author : req.user._id})
        req.user.post.push(createPost)
         await req.user.save()

         res.status(201).json({message : "post create sucessfully" , data : createPost })

        
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
})

router.get("/posts",isLoggedIn, async (req,res)=>{

    const loggedInUserId = req.user._id

    const foundPost = await User.find({author : loggedInUserId}).populate(
        [
            {
                path : "comment",
                populate : {
                    path : "author"
                }
            }
        ]
    )

})

module.exports={
    postRouter : router
}