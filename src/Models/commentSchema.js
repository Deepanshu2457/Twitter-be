const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "User"
    },
    text : {
        type : String,
        trim : true,
        maxlength : 150 
    },
    likes : [{ type : mongoose.Schema.Types.ObjectId, ref : " User"}],
     replies : [{type : mongoose.Schema.Types.ObjectId, ref : "reply"}]
})

const comment = mongoose.model("comment", commentSchema)

module.exports= {
    comment
}