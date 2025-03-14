const PaymentMethod = require('../models/PaymentMethod');

// Lấy danh sách phương thức thanh toán
const getAllPaymentMethods = async () => {
    return await PaymentMethod.find();
};

// Thêm phương thức thanh toán mới
const createPaymentMethod = async (paymentData) => {
    if (!paymentData) throw new Error('phương thức thanh toán là bắt buộc');
    const newPayment = new PaymentMethod(paymentData);
    return await newPayment.save();
};

// Cập nhật phương thức thanh toán
const updatePaymentMethod = async (id, data) => {
    const updatedPayment = await PaymentMethod.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPayment) throw new Error('Không tìm thấy phương thức thanh toán');
    return updatedPayment;
};

// Xóa phương thức thanh toán
const deletePaymentMethod = async (id) => {
    const deletedPayment = await PaymentMethod.findByIdAndDelete(id);
    if (!deletedPayment) throw new Error('Không tìm thấy phương thức thanh toán');
    return deletedPayment;
};
const updatePaymentStatus = async (paymentId, status) => {
    return await PaymentMethod.findByIdAndUpdate(
        paymentId,
        { status },
        { new: true }
    );
};
const getPaymentMethodById = async (id) => {
    const payment = await PaymentMethod.findById(id);
    if (!payment) throw new Error('Không tìm thấy phương thức thanh toán');
    return payment;
};
module.exports = {
    getAllPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    updatePaymentStatus,
    getPaymentMethodById
};
