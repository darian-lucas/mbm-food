const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    payment_name: { 
        type: String, 
        enum: ["cash", "momo", "vnpay"], 
        required: true 
    },

    status: { 
        type: String, 
        enum: ["pending", "completed", "failed", "refunded"], 
        default: "pending" 
    },

    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
