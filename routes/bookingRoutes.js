const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const controller = require('../controllers/bookingController');
const router = express.Router();
router.get('/services', isLoggedIn, controller.showServices);
router.post('/services/book', isLoggedIn, controller.createBooking);
router.get('/bookings', isLoggedIn, controller.showBookings);
module.exports = router;
