const express = require("express")

const router = express.Router()
const {isAuthor} = require("../Middleware/IsAuthor")
const {isLoggedIn} = require("../Middleware/IsLoggedIn")
const {Post} = require("../Models/postSchema")
const {Comment} = require("../Models/commentSchema")

router.post("comment/:id",isLoggedIn, async (req,res)=>{
    try {
        const {id} = req.params
        const {text} = req.body

        const foundPost = await Post.findById(id)

        if(!foundPost){
            throw new Error("post not found / page does not Exist")
        }

        const newComment = await Comment.create({text, author : req.user._id})
         foundPost.comment.push(newComment)
         await foundPost.save()
         res.status(201).json({message : "done"})        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.delete("/comment/:commentId/:postId", isLoggedIn , async (req,res)=>{
    try {
        const { commentId,postId} = req.params
        const foundComment = await Comment.findById(commentId)
        const foundPost = await Post.findById(postId)

        let isEligibleToDelete = foundComment.author.toString() == req.user._id.toString() || foundPost.author.toString() == req.user._id.toString()

        if(!isEligibleToDelete){
            throw new Error("Access Denied")
        }

        const filteredComments = foundPost.comment.filter((item)=>{
            return item.toString() !=commentId
        })
        foundPost.comment = filteredComments
        await foundPost.save()
        await Comment.findByIdAndDelete(commentId)

        res.status(200).json({message: "done"})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})

module.exports = {
    commentRouter : router
}