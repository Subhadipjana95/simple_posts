const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    caption: {
        type: String,
    },
    user: {
        type: String,
        default: 'Anonymous',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: {
        type: Number,
        default: 0,
    },
});

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;