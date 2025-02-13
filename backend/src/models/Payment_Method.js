const mongoose = require('mongoose');

const paymentMethodSchema = new mongoose.Schema({
    payment_name: { type: String, required: true },
    status: { type: String, default: 'active' },
    create_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment_Method', paymentMethodSchema);