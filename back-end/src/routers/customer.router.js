const express = require('express');

const customerController = require('../controllers/customer.controller');

const router = express.Router();

const idRoute = '/customer/products/:id';

router.get('/customer/products', customerController.getAllProducts);
router.get(idRoute, customerController.getProductById);

router.post('/customer/products', customerController.createProduct);

router.put(idRoute, customerController.updateProduct);

router.delete(idRoute, customerController.deleteProduct);

module.exports = router;
