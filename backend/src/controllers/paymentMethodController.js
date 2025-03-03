const paymentMethodService = require('../services/paymentMethodService');

// Lấy danh sách phương thức thanh toán
const getAll = async (req, res) => {
    try {
        const payments = await paymentMethodService.getAllPaymentMethods();
        res.json({ success: true, data: payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Thêm phương thức thanh toán
const create = async (req, res) => {
    try {
        const { payment_name } = req.body;
        const newPayment = await paymentMethodService.createPaymentMethod(payment_name);
        res.json({ success: true, message: 'Thêm thành công', data: newPayment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Cập nhật phương thức thanh toán
const update = async (req, res) => {
    try {
        const updatedPayment = await paymentMethodService.updatePaymentMethod(req.params.id, req.body);
        res.json({ success: true, message: 'Cập nhật thành công', data: updatedPayment });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

// Xóa phương thức thanh toán
const remove = async (req, res) => {
    try {
        await paymentMethodService.deletePaymentMethod(req.params.id);
        res.json({ success: true, message: 'Xóa thành công' });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = { getAll, create, update, remove };
