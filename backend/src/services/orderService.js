const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');

class OrderService {
    async createOrder(orderData, products) {
        const order = new Order(orderData);
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
        const order = await Order.findById(orderId).populate('id_user', 'name email').populate('id_payment_method', 'name').lean();
        if (!order) return null;

        order.details = await OrderDetail.find({ id_order: order._id }).populate('id_product', 'name price');
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
