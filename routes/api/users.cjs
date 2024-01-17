const express = require("express");
const router = express.Router();
const User = require("../../models/User.cjs");
const bcrypt = require("bcrypt");
const Post = require("../../models/Post.cjs");
const Comment = require("../../models/Comment.cjs");
const checkToken = require("../../config/checkToken.cjs");
// UPDATE
router.put("/:id", checkToken, async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUserInfo = await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true});
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});
// DELETE
router.delete("/:id", checkToken, async (req, res) => {
  try {
    await User.findOneAndDelete({_id: req.params.id});
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});
// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});
module.exports = router;