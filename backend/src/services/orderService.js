const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

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
                    total: product.total || product.price * product.quantity, // Tránh lỗi thiếu total
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
    
    async createOrder(orderData, products) {
        const orderCode = await this.generateOrderCode();
        const order = new Order({ ...orderData, order_code: orderCode });
        const savedOrder = await order.save();

        const orderDetails = products.map(product => ({
            id_order: savedOrder._id,
            id_product: product.id_product,
            total: product.total,
            quantity: product.quantity,
            name: product.name
        }));

        await OrderDetail.insertMany(orderDetails);
        return savedOrder;
    }

    async getAllOrders() {
        const orders = await Order.find().populate('id_user', 'name').populate('id_payment_method', 'name').lean();
        for (let order of orders) {
            order.details = await OrderDetail.find({ id_order: order._id }).populate('id_product', 'name price');
        }
        return orders;
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
    

    async updateOrderStatus(orderId, status) {
        return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    }

    async deleteOrder(orderId) {
        const order = await Order.findByIdAndDelete(orderId);
        if (order) {
            await OrderDetail.deleteMany({ id_order: orderId });
        }
        return order;
    }
}

module.exports = new OrderService();
