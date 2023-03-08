const sellerService = require('../services/seller.service');

const getOrdersByUser = async (req, res) => {
  const { sellerId } = req.body;
  const { message } = await sellerService.getOrdersByUser(sellerId);

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

module.exports = { getOrdersByUser, getOrderById, updateOrder };
