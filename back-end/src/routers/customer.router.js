const express = require('express');

const customerController = require('../controllers/customer.controller');

const router = express.Router();

const idRoute = '/products/:id';

router.get('/products', customerController.getAllProducts);
router.get(idRoute, customerController.getProductById);

router.post('/products', customerController.createProduct);

router.put(idRoute, customerController.updateProduct);

router.delete(idRoute, customerController.deleteProduct);

module.exports = router;
