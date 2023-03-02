const { Product } = require('../database/models');

const getAll = async () => {
  const products = await Product.findAll();

  return { message: products };
};

const getById = async (id) => {
  const product = await Product.findByPk(id);

  return { message: product };
};

const create = async (obj) => {
  const newProduct = await Product.create(obj);

  return { message: newProduct };
};

const update = async (id, name, price, urlImage) => {
  await Product.update({ name, price, urlImage }, { where: { id } });

  return { message: 'Product updated' };
};

const deleteProduct = async (id) => {
  await Product.destroy({ where: { id } });

  return { message: 'Product deleted' };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};
