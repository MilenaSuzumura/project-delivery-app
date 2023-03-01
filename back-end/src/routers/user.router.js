const express = require('express');

const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/login', validateUser, userController.login);

module.exports = router;
