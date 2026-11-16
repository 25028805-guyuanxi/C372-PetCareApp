const express = require('express');
const upload = require('../middleware/upload');
const { isLoggedIn } = require('../middleware/auth');
const controller = require('../controllers/petController');
const router = express.Router();

router.get('/pets/new', isLoggedIn, controller.showNewPet);
router.post('/pets', isLoggedIn, upload.single('pet_image'), controller.createPet);

module.exports = router;
