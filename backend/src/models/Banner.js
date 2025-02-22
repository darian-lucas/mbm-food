const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    img_url: { type: String, required: true }
});

module.exports = mongoose.model('Banner', bannerSchema);
