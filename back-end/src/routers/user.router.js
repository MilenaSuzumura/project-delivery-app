const express = require('express');

const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.get('/seller', userController.getSellers);

router.post('/login', validateUser, userController.login);
router.post('/register', userController.register);

module.exports = router;
