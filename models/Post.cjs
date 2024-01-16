const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
