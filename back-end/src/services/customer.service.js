const { Product } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();

  return { message: products };
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id);

  return { message: product };
};

const createProduct = async (obj) => {
  const newProduct = await Product.create(obj);

  return { message: newProduct };
};

const updateProduct = async (id, name, price, urlImage) => {
  await Product.update({ name, price, urlImage }, { where: { id } });

  return { message: 'Product updated' };
};

const deleteProduct = async (id) => {
  await Product.destroy({ where: { id } });

  return { message: 'Product deleted' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
