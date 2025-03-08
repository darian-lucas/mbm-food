const mongoose = require("mongoose");

const PaymentMethodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "VND" },

    paymentType: { 
        type: String, 
        enum: ["prepaid", "postpaid", "in_store"], 
        required: true 
    },

    method: { 
        type: String, 
        enum: ["stripe", "paypal", "momo", "vnpay", "mobile_banking", "cash", "pos"], 
        required: true 
    },

    status: { 
        type: String, 
        enum: ["pending", "completed", "failed", "refunded"], 
        default: "pending" 
    },

    createdAt: { type: Date, default: Date.now }
});

// **VALIDATE phương thức thanh toán dựa trên paymentType**
PaymentMethodSchema.pre("validate", function (next) {
    const validMethods = {
        prepaid: ["stripe", "paypal", "momo", "vnpay", "mobile_banking"],
        postpaid: ["stripe", "paypal", "momo", "vnpay", "mobile_banking", "cash"],
        in_store: ["cash", "mobile_banking", "pos"]
    };

    if (!validMethods[this.paymentType].includes(this.method)) {
        return next(new Error(`Phương thức '${this.method}' không hợp lệ cho loại thanh toán '${this.paymentType}'`));
    }

    next();
});
    
module.exports = mongoose.model("PaymentMethod", PaymentMethodSchema);
