const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    img: { type: String, required: true },
    content: { type: String, required: true },
    title: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    status: { type: String, default: 'active' },
    author: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);