const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    discount: { type: Number, required: true }
});

module.exports = mongoose.model('Coupon', couponSchema);