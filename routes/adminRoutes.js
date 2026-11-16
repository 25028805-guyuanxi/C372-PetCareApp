const express = require('express');
const { isAdmin } = require('../middleware/auth');
const controller = require('../controllers/adminController');
const router = express.Router();

router.get('/dashboard', isAdmin, controller.dashboard);
router.get('/users', isAdmin, controller.users);
router.get('/users/:id', isAdmin, controller.userDetails);
router.get('/users/delete/:id', isAdmin, controller.deleteUser);

module.exports = router;
