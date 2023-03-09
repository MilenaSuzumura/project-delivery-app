const sellerService = require('../services/seller.service');

const getAllOrders = async (_req, res) => {
  const { message } = await sellerService.getAllOrders();

  return res.status(200).json(message);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const { message } = await sellerService.getOrderById(id);

  return res.status(200).json(message);
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { message } = await sellerService.updateOrder(id, status);

  return res.status(200).json(message);
};

const getOrderBySeller = async (req, res) => {
  const { sellerId } = req.body;
  const { message } = await sellerService.getOrderBySeller(sellerId);

  return res.status(200).json(message);
};

module.exports = { getAllOrders, getOrderById, updateOrder, getOrderBySeller };
