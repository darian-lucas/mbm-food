const paymentMethodService = require('../services/paymentService');
const axios = require("axios");
const crypto = require("crypto");
const PaymentMethod = require("../models/PaymentMethod");
const Order = require("../models/Order");


const MOMO_PARTNER_CODE = "MOMO"; // Thay bằng Partner Code của bạn
const MOMO_ACCESS_KEY = "F8BBA842ECF85"; // Thay bằng Access Key
const MOMO_SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz"; // Thay bằng Secret Key
const MOMO_ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create";
const RETURN_URL = "http://localhost:3000/payment-success"; // URL frontend sau khi thanh toán thành công
const NOTIFY_URL = "http://localhost:3100/api/payment/momo/callback"; // URL backend nhận callback

// Tạo thanh toán Momo
const createMomoPayment = async (req, res) => {
    try {
        console.log("Dữ liệu nhận được từ frontend:", req.body);
        const { order_code, amount } = req.body;

        if (!order_code || !amount) {
            return res.status(400).json({ message: "Thiếu order_code hoặc amount" });
        }
        
        // Tạo raw signature
        const requestId = `${order_code}_${Date.now()}`;
        const orderInfo = `Thanh toán đơn hàng #${order_code}`;
        const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${NOTIFY_URL}&orderId=${order_code}&orderInfo=${orderInfo}&partnerCode=${MOMO_PARTNER_CODE}&redirectUrl=${RETURN_URL}&requestId=${requestId}&requestType=captureWallet`;
        const signature = crypto.createHmac("sha256", MOMO_SECRET_KEY).update(rawSignature).digest("hex");

        const paymentData = {
            partnerCode: MOMO_PARTNER_CODE,
            requestId,
            amount,
            orderId: order_code,
            orderInfo,
            redirectUrl: RETURN_URL,
            ipnUrl: NOTIFY_URL,
            extraData: "",
            requestType: "captureWallet",
            signature,
            lang: "vi"
        };

        // Gửi yêu cầu thanh toán đến Momo
        const response = await axios.post(MOMO_ENDPOINT, paymentData);
        return res.json({ payUrl: response.data.payUrl });

    } catch (error) {
        console.error("Lỗi khi tạo thanh toán Momo:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// Xử lý callback từ Momo
const momoCallback = async (req, res) => {
    try {
        const { orderId, resultCode } = req.body; // orderId chính là order_code

        if (resultCode === 0) {
            await PaymentMethod.updateOne(
                { order_code: orderId },
                { status: "completed" }
            );
            await Order.updateOne(
                { order_code: orderId },
                { status: "paid" }
            );
            console.log(`✅ Thanh toán Momo thành công cho đơn hàng ${orderId}`);
        } else {
            console.log(`❌ Thanh toán Momo thất bại cho đơn hàng ${orderId}`);
        }

        res.status(200).json({ message: "Callback received" });

    } catch (error) {
        console.error("Lỗi xử lý callback Momo:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// Lấy danh sách phương thức thanh toán
const getAll = async (req, res) => {
    try {
        const payments = await paymentMethodService.getAllPaymentMethods();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm phương thức thanh toán


module.exports = { getAll , createMomoPayment, momoCallback };
