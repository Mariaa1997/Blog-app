const express = require("express");
const router = express.Router();
const User = require("../../models/User.cjs");
const bcrypt = require("bcrypt");
const Post = require("../../models/Post.cjs");
const Comment = require("../../models/Comment.cjs");
const checkToken = require("../../config/checkToken.cjs");

// CREATE
router.post("/create", checkToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// UPDATE
router.put("/:id", checkToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// DELETE
router.delete("/:id", checkToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).end(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// GET POST COMMENTS
router.get("/post/:Id", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;

