
const checkToken = require("../../config/checkToken.cjs")
const express = require('express');
const router = express.Router();
const User=require("../../models/User.cjs")
const bcrypt =require('bcrypt')
const Post =require("../../models/Post.cjs")
const Comment =require("../../models/Comment.cjs")


//create
router.post("/create",checkToken, async (req,res) => {
    try {
        const newPost = new Post (req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
    res.status(500).json(error)
    }})

//update
router.put("/:id",checkToken,async (req,res) =>{
    try{
        const updatedUser= await Post.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete route
router.delete("/:id",checkToken,async (req,res) =>{
    try{
        await Post.deleteMany(req.params.id)
        res.status(200).json("Post has been deleted")
       
    } catch (error) {
        res.status(500).json(error)
    }
})

//get post details
router.get("/:id",async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
       
    } catch (error) {
        res.status(500).json(error)
    }
})

//get post 
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//get user posts
router.get("/:userId",async (req,res) =>{
    try{
        const posts = await Post.find(req.params.id)
        res.status(200).json(posts)
       
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;