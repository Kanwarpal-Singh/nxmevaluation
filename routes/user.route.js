const express = require("express")
const {UserModel} = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try {
        bcrypt.hash(password,4,async(err,hashed_pass)=>{
           if(err){
            console.log(err)
           }else{
            const user = new UserModel({name:name,email:email,gender:gender,password:hashed_pass})
            await user.save()
            console.log(hashed_pass)
            res.send(`${user.name} has been registered`)
           }
        })
    } catch (error) {
        console.log("error:",error)
    }
})


userRouter.post("/login",async(req,res)=>{
   const {email,password} = req.body
   try {
    const user = await UserModel.find({email})
    hashed_pass = user[0].password
    if(user.length>0){
        bcrypt.compare(password,hashed_pass,(err,result)=>{
        if(result){
            const token = jwt.sign({userID:user[0]._id},"masai")
            console.log(user,"login Successfull")
            res.send({"msg":"login successful","token":token})
        }else{
            console.log("Invalid Cridentials or Register first")
            res.send("Invalid Cridentials or Register first")
        }
    })
    }else{
        res.send("wrong credentials")
    }
    
   } catch (error) {
       console.log("error:",error)
       res.send(error)
   }
})

module.exports = {userRouter}