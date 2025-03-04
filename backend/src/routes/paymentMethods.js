const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentController');

router.get('/', paymentMethodController.getAll);
router.post('/', paymentMethodController.create);
router.patch('/:id', paymentMethodController.update);
router.delete('/:id', paymentMethodController.remove);

module.exports = router;
