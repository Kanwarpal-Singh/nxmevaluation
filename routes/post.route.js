const express = require("express")
const {PostModel} = require("../models/post.model")
const  postRouter = express.Router()

postRouter.get("/",(req,res)=>{
    console.log("all posts")
})


postRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    try {
        const new_post = new PostModel(payload)
        await new_post.save()
        res.send("Post has been created")
        
    } catch (error) {
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const id = req.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post = post.userID
    const userID_making_req = req.body.userID_in_post

    try {
        if(userID_making_req !==userID_in_post){
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Post has been updated")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong"})
    }
})

postRouter.delete("/remove/:id",async(req,res)=>{
    const id = req.params.id
    const post = await PostModel.find({"_id":id})
    const userID_in_post = post.userID
    const userID_making_req = req.body.userID_in_post

    try {
        if(userID_making_req !==userID_in_post){
            res.send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send("Post has been deleted")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong"})
    }
})

module.exports = {
    postRouter
}