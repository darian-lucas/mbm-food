const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    
    paymentType: { 
        type: String, 
        enum: ["prepaid", "postpaid", "in_store"], 
        required: true 
    },

    method: { 
        type: String, 
        enum: ["stripe", "paypal", "momo", "vnpay", "mobile_banking", "cash"], 
        required: true 
    },

    status: { type: String, enum: ["pending", "completed", "failed", "refunded"], default: "pending" },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment_Method", PaymentMethodSchema);
// Xử lý logic
// Khách chọn prepaid → Yêu cầu họ chọn "stripe", "paypal", "momo", "vnpay", "mobile_banking" và hoàn thành thanh toán trước.
// Khách chọn postpaid → Cho phép chọn "stripe", "paypal", "momo", "vnpay", "mobile_banking", "cash" khi nhận hàng.
// Khách chọn in_store → Yêu cầu chọn "cash", "mobile_banking", hoặc thanh toán qua máy POS tại cửa hàng.