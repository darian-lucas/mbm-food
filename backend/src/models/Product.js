const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    sale_price: { type: Number },
    thumbnail: { type: String, required: true },
    des: { type: String },
    id_category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    create_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);