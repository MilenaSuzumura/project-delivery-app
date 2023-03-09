const express = require('express');

const customerController = require('../controllers/customer.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

const productById = '/products/:id';
const salesById = '/sales/:id';

router.get('/orders/:id', customerController.getOrderById);
router.get('/products', customerController.getAllProducts);
router.get(productById, customerController.getProductById);
router.get('/sales', customerController.getAllSales);
router.get(salesById, customerController.getSaleById);

router.post('/orders', customerController.getOrdersByUser);
router.post('/checkout', validateToken, customerController.checkout);
router.post('/products', customerController.createProduct);

router.put(productById, customerController.updateProduct);
router.put(salesById, customerController.updateSale);

router.delete(productById, customerController.deleteProduct);
router.delete(salesById, customerController.deleteSale);

module.exports = router;
