const PaymentMethod = require('../models/Payment_Method');

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

module.exports = {
    getAllPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
};
