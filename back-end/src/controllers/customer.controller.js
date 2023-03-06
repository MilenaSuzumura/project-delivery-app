const customerService = require('../services/customer.service');

const getAllProducts = async (_req, res) => {
  const { message } = await customerService.getAllProducts();

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerService.getProductById(id);

  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { message } = await customerService.createProduct(req.body);

  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage } = req.body;
  const { message } = await customerService.updateProduct(id, name, price, urlImage);

  return res.status(200).json({ message });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerService.deleteProduct(id);

  return res.status(202).json({ message });
};

const getAllSales = async (_req, res) => {
  const { message } = await customerService.getAllSales();

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { message } = await customerService.getSaleById(id);

  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const { message } = await customerService.createSale(req.body);

  return res.status(201).json(message);
};

const getOrdersByUser = async (req, res) => {
  const { userId } = req.body;
  const { message } = await customerService.getSalesByUser(userId);

  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllSales,
  getSaleById,
  createSale,
  getOrdersByUser,
};
