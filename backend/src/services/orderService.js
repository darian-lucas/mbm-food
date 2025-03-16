const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const PaymentMethod = require("../models/PaymentMethod");
const mongoose = require("mongoose");

class OrderService {
    async generateOrderCode() {
        let orderCode;
        let isUnique = false;

        while (!isUnique) {
            const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 chữ số
            orderCode = `MBM-${randomNum}`;
            const existingOrder = await Order.findOne({ order_code: orderCode });
            if (!existingOrder) {
                isUnique = true;
            }
        }

        return orderCode;
    }
    async updateOrder(orderId, updateData) {
        try {
            // Cập nhật thông tin Order
            const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

            if (!updatedOrder) {
                throw new Error("Không tìm thấy đơn hàng");
            }

            // Xóa OrderDetail cũ trước khi thêm dữ liệu mới
            await OrderDetail.deleteMany({ id_order: orderId });

            // Thêm OrderDetail mới từ updateData.details
            if (updateData.details && updateData.details.length > 0) {
                const orderDetails = updateData.details.map(product => ({
                    id_order: orderId,
                    id_product: product.id_product,
                    total_amount: product.price || product.price * product.quantity, // Tránh lỗi thiếu total
                    quantity: product.quantity,
                    name: product.name
                }));

                await OrderDetail.insertMany(orderDetails);
            }

            return updatedOrder;
        } catch (error) {
            throw new Error("Lỗi khi cập nhật đơn hàng: " + error.message);
        }
    }

    async createOrder(orderData, products, paymentData) {
        const session = await mongoose.startSession();
        console.log("🟢 Bắt đầu session:", session.id);

        session.startTransaction();
        console.log("🔄 Transaction bắt đầu");

        try {
            const orderCode = await this.generateOrderCode();
            console.log("📌 Mã đơn hàng:", orderCode);

            // **Tạo đơn hàng trước**
            const order = new Order({
                ...orderData,
                order_code: orderCode,
            });
            const savedOrder = await order.save({ session });
            console.log("✅ Đơn hàng được tạo:", savedOrder._id);

            // **Xử lý phương thức thanh toán**
            const paymentMethod = orderData.payment_method || "cash"; // Mặc định là 'cash' nếu không có giá trị

            const fullPaymentData = {
                payment_name: paymentMethod, // cash, momo, vnpay
                status: "pending", // Trạng thái mặc định

            };

            // Ghi log để kiểm tra
            console.log("📌 Dữ liệu thanh toán trước khi lưu:", fullPaymentData);

            // **Tạo phương thức thanh toán**
            const payment = new PaymentMethod(fullPaymentData);
            const savedPayment = await payment.save({ session });
            console.log("✅ Phương thức thanh toán được tạo:", savedPayment._id);

            // **Tạo chi tiết đơn hàng**
            const orderDetails = products.map(product => ({
                id_order: savedOrder._id,
                id_product: product.id_product,
                price: product.price,
                quantity: product.quantity,
                name: product.name
            }));

            await OrderDetail.insertMany(orderDetails, { session });
            console.log("✅ Chi tiết đơn hàng được tạo:", orderDetails.length, "mục");

            // **Cập nhật ID phương thức thanh toán vào đơn hàng**
            await Order.updateOne(
                { _id: savedOrder._id },
                { id_payment_method: savedPayment._id },
                { session }
            );
            console.log("✅ Đã cập nhật phương thức thanh toán vào đơn hàng");

            // **Commit transaction**
            await session.commitTransaction();
            console.log("🎉 Transaction commit thành công!");

            session.endSession();
            return { order: savedOrder, payment: savedPayment };
        } catch (error) {
            console.error("❌ Lỗi! Rollback transaction:", error);
            await session.abortTransaction();
            session.endSession();
            throw new Error("Lỗi khi tạo đơn hàng và thanh toán: " + error.message);
        }
    }






    async getAllOrders() {
        const orders = await Order.find()
            .populate('id_user', 'name')
            .populate('id_payment_method', 'name')
            .lean();

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const details = await OrderDetail.find({ id_order: order._id })
                    .populate('id_product', 'name price')
                    .lean();
                return { ...order, details }; // Gán `details` vào mỗi order
            })
        );

        return ordersWithDetails;
    }


    async getOrderById(orderId) {
        const order = await Order.findById(orderId)
            .populate("id_user", "name email")
            .populate("id_payment_method", "name")
            .lean();
        if (!order) return null;

        order.details = await OrderDetail.find({ id_order: order._id })
            .populate({
                path: "id_product",
                select: "name variants.price",
                model: "product" // Đảm bảo model đúng
            });
        return order;
    }


    async updateOrderStatus(id, status) {
        if (!["pending", "shipped", "delivered", "canceled"].includes(status)) {
            throw new Error("Trạng thái không hợp lệ");
        }

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            throw new Error("Không tìm thấy đơn hàng");
        }

        return updatedOrder;
    };


    async deleteOrder(orderId) {
        const order = await Order.findByIdAndDelete(orderId);
        if (order) {
            await OrderDetail.deleteMany({ id_order: orderId });
        }
        return order;
    }
    async getOrdersByUserId(userId) {
        try {
            const orders = await Order.find({ id_user: userId })
                .populate("id_user", "username email")

                .populate("id_payment_method", "method")
                .sort({ createdAt: -1 });

            const orderIds = orders.map(order => order._id);
            const orderDetails = await OrderDetail.find({ id_order: { $in: orderIds } })
                .populate("id_product", "name price");

            return { orders, orderDetails };
        } catch (error) {
            throw new Error("Lỗi khi lấy đơn hàng của user: " + error.message);
        }
    }

    async updateOrderTime(orderId, newCreatedAt) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { createdAt: new Date(newCreatedAt) },
                { new: true }
            );

            if (!updatedOrder) {
                throw new Error("Không tìm thấy đơn hàng");
            }

            return updatedOrder;
        } catch (error) {
            throw new Error("Lỗi khi cập nhật thời gian đơn hàng: " + error.message);
        }
    }

}

module.exports = new OrderService();
