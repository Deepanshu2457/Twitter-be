const express=require("express")

const router = express.Router()
const { isLoggedIn } = require("../Middleware/IsLoggedIn")
const { isAuthor } = require("../Middleware/IsAuthor")
const {Post} = require("../Models/postSchema")
const {User} = require("../Models/userSchema")
const { Reply } = require("../Models/Replies")
const { comment } = require("../Models/commentSchema")



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

    try {
         const loggedInUserId = req.user._id

    const foundPosts = await User.find({author : loggedInUserId}).populate(
        [
            {
                path : "comment",
                populate : {
                    path : "author",
                    select : "firstName lastName username profilePicture"
                }
            },
         {
            path : "likes",
            select : "firstName lastName username profilePicture"
         }
        ]

    )

    res.status(200).json({
        message : "done",
        data : foundPosts
    })
        
    }
     catch (error) {
        res.status(400).json({ error:error.message})
        
    }
})

router.get("/posts/:id", isLoggedIn , isAuthor , async(req,res)=>{
    try {
            const foundPost = await Post.findById(req.params.id)
           res.status(200).json({ message : " Fatch Post " , data : foundPost})
        
    } catch (error) {
        res.status(400).json({error : error.message || "please try again "})
    }

})


router.delete("/posts/:id" , isLoggedIn, isAuthor, async(req,res)=>{
    try {
         const {id} = req.params
     const foundpost = await Post.findById(id)
     if(!foundpost){
        throw new Error(" try Again post not found")

     } 
     for(let item of foundpost.comment){
        const foundComment = await comment.findById(item)

        for(let i of foundpost.replies){
            await Reply.findByIdAndDelete(i)
            
        }
        await comment.findByIdAndDelete(item)
     }
     await Post.findByIdAndDelete(id)
         
     res.status(200).json({message : "delete Post" , })
        
    } 
    
    catch (error) {
        res.status(400).json({error:error.message})
        
    }
    
})


module.exports={
    postRouter : router
}