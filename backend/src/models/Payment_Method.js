const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    method: { 
        type: String, 
        enum: ["stripe", "paypal", "momo", "vnpay", "mobile_banking"], 
        required: true 
    },
    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment_Method", PaymentMethodSchema);
