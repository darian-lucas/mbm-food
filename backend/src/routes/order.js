const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();
router.get('/user/:userId', OrderController.getOrdersByUserId);
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.delete('/:id', OrderController.deleteOrder);
router.put('/:orderId', OrderController.updateOrder);
router.put("/:id/status", OrderController.updateOrderStatus);
module.exports = router;
