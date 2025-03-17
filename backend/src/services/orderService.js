const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const PaymentMethod = require("../models/PaymentMethod");
const mongoose = require("mongoose");
const Coupon = require("../models/CouponModel"); 
class OrderService {
   
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

    // Import model Coupon

   

    async createOrder(orderData, products, paymentData) {
        const session = await mongoose.startSession();
        console.log("🟢 Bắt đầu session:", session.id);
    
        session.startTransaction();
        console.log("🔄 Transaction bắt đầu");
    
        try {
            let orderCode = orderData.order_code;
            console.log("📌 Mã đơn hàng:", orderCode);
    
            // **Tính tổng tiền chưa giảm giá**
            let totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
            console.log("💰 Tổng tiền trước giảm giá:", totalAmount);
    
            // **Tìm id_coupon từ discount_code nếu có**
            let id_coupon = null;
            let discountAmount = 0;
    
            if (orderData.discount_code) {
                const coupon = await Coupon.findOne({ code: orderData.discount_code }).session(session);
                if (coupon) {
                    id_coupon = coupon._id; // Gán id_coupon nếu tìm thấy
                    console.log("✅ Mã giảm giá hợp lệ:", orderData.discount_code, " - ID:", id_coupon);
    
                    // **Tính tiền giảm giá**
                    if (coupon.type === "Amount") {
                        discountAmount = coupon.discount; // Giảm trực tiếp số tiền
                    } else if (coupon.type === "Shipping") {
                        discountAmount = Math.min(coupon.discount, totalAmount * 0.1); // Giảm phí vận chuyển tối đa 10% tổng tiền
                    }
                } else {
                    console.log("⚠️ Không tìm thấy mã giảm giá:", orderData.discount_code);
                }
            }
    
            // **Tính tổng thanh toán sau khi giảm giá**
            let totalPayment = Math.max(0, totalAmount - discountAmount);
            console.log("💳 Tổng tiền sau giảm giá:", totalPayment);
    
            // **Tạo đơn hàng trước**
            const order = new Order({
                ...orderData,
                order_code: orderCode,
                id_coupon, // Lưu id_coupon vào đơn hàng
                total_amount: totalAmount, // Tổng tiền gốc
                total_payment: totalPayment, // Tổng tiền sau giảm giá
            });
    
            const savedOrder = await order.save({ session });
            console.log("✅ Đơn hàng được tạo:", savedOrder._id);
    
            // **Xử lý phương thức thanh toán**
            const paymentMethod = orderData.payment_method || "cash"; // Mặc định 'cash' nếu không có giá trị
            const fullPaymentData = {
                payment_name: paymentMethod,
                status: "pending",
            };
    
            console.log("📌 Dữ liệu thanh toán trước khi lưu:", fullPaymentData);
    
           
    
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
    
     
    
            // **Commit transaction**
            await session.commitTransaction();
            console.log("🎉 Transaction commit thành công!");
    
            session.endSession();
            return { order: savedOrder};
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
