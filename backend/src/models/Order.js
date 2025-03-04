const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    id_employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    receive_address: { type: String, required: true },
    id_payment_method: { type: mongoose.Schema.Types.ObjectId, ref: "Payment_Method" }, // Kiểm tra dòng này!
    status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "canceled"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
