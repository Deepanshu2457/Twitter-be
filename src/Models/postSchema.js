const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    author : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : " user"

    },
    caption : {
        type : String,
        maxlength : 100,
        trim : true

    },
    image : {
        type : String,
        trim : true

    },
    likes : [
        {type : mongoose.Schema.Types.ObjectId, ref : "user"}
    ],
    comment : [
        { type : mongoose.Schema.Types.ObjectId, ref : "comment"}
    ]
})

const Post = mongoose.model("post", postSchema)

module.exports = {
    Post
}