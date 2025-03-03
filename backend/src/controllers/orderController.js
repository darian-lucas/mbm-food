const OrderService = require('../services/orderService');

class OrderController {
    async createOrder(req, res) {
        try {
            const { id_user, id_coupon, id_employee, id_payment_method, amount, address, phone, name, receive_address, products } = req.body;
            const order = await OrderService.createOrder({ id_user, id_coupon, id_employee, id_payment_method, amount, address, phone, name, receive_address }, products);
            res.status(201).json({ message: 'Order created successfully', order });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOrderById(req, res) {
        try {
            const order = await OrderService.getOrderById(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { status } = req.body;
            const updatedOrder = await OrderService.updateOrderStatus(req.params.id, status);
            if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const order = await OrderService.deleteOrder(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OrderController();
