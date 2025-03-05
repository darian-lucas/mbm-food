const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();
router.get('/user/:userId', OrderController.getOrdersByUserId);
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.patch('/:id', OrderController.updateOrderStatus);
router.delete('/:id', OrderController.deleteOrder);
router.put('/:orderId', OrderController.updateOrder);

module.exports = router;
