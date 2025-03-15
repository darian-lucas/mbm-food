const paymentMethodService = require('../services/paymentService');

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
const create = async (req, res) => {
    try {
        const { userId, name, orderId, amount, currency, method,paymentType } = req.body;

        // Tạo phương thức thanh toán mới
        const newPayment = await paymentMethodService.createPaymentMethod({
            userId,
            name,
            orderId,
            amount,
            currency,
            method,
            paymentType
        });

        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Cập nhật phương thức thanh toán
const update = async (req, res) => {
    try {
        const updatedPayment = await paymentMethodService.updatePaymentMethod(req.params.id, req.body);
        res.json(updatedPayment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Xóa phương thức thanh toán
const remove = async (req, res) => {
    try {
        await paymentMethodService.deletePaymentMethod(req.params.id);
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const payOrder = async (req, res) => {
    try {
        const payment = await paymentMethodService.updatePaymentStatus(req.params.paymentId, "completed");
        if (!payment) return res.status(404).json({ success: false, message: "Không tìm thấy payment" });

        res.json({ success: true, message: "Thanh toán thành công!", payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi cập nhật payment" });
    }
};
const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await paymentMethodService.getPaymentMethodById(id);
        res.status(200).json(payment);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


module.exports = { getAll, create, update, remove,payOrder,getPaymentById };
