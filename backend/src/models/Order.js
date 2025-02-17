const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    id_coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    id_employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    id_payment_method: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment_Method', required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    receive_address: { type: String, required: true },
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);