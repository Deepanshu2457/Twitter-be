require("dotenv").config()
const express=require("express")
const {authRouter} = require("./Routes/AuthRoute")
const { commentRouter } = require("./Routes/Comment.Route")
const { otpRoutes } = require("./Routes/Otp.routes")
const { postRouter } = require("./Routes/PostRoutes")
const { ProfileRoutes } = require("./Routes/ProfileRoutes")
const { replyRoute } =require("./Routes/ReplyRoute")
const cookieParser = require("cookie-parser")


const app=express()
app.use(express.json())
app.use(cookieParser())
const mongoose=require("mongoose")

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("db connected");
    app.listen(process.env.PORT, ()=>{
    console.log("Server is running on PORT " + process.env.PORT);

})
    
})
.catch((err) => {
    console.log(err,"db connection failed");
});

app.get("/",(req,res) => {
    res.send("Home Page")
})
app.use("/api",authRouter)
app.use("/api",postRouter)
app.use("/api",commentRouter)
app.use("/api",otpRoutes)
app.use("/api",postRouter)
app.use("/api", ProfileRoutes)
app.use("/api",replyRoute)




