const express = require('express');
const controller = require('../controllers/paymentController');
const router = express.Router();

router.get('/prepare/:serviceId', controller.preparePayment);
router.post('/mock/:serviceId', controller.createMockPayment);

module.exports = router;
