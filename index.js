const express = require("express")
const {connection} = require("./config/db")
// const {UserModel} = require("./models/user.model")
const {userRouter} = require("./routes/user.route")
const {postRouter} = require("./routes/post.route")
const {authenticate} = require("./middlewares/authenticate.middleware")

const app = express()
app.use(express.json())

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to the data base")
    } catch (error) {
        console.log(error)
    }   
    console.log("server is running at Port 8080")
})