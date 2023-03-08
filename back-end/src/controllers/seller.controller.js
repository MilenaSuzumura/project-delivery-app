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

const getAllSellers = async (req, res) => {
  const { message } = await sellerService.getAllSellers();
  return res.status(200).json(message);
}

/* const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { message } = await sellerService.getOrderById(id);

  return res.status(200).json(message);
} */

module.exports = { getOrdersByUser, getOrderById, getAllSellers };
