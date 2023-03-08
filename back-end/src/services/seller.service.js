const { Product, Sale, User } = require('../database/models');

const getOrdersByUser = async (sellerId) => {
  const orders = await Sale.findAll({ where: { sellerId } });

  return { message: orders };
};

const getOrderById = async (id) => {
  const orderById = await Sale.findByPk(
    id, { include: [{ model: Product, as: 'products' }, { model: User, as: 'seller' }] },
  );

  return { message: orderById };
};

const updateOrder = async (id, status) => {
  await Sale.update({ status }, { where: { id } });

  const order = await Sale.findByPk(
    id, { include: [{ model: Product, as: 'products' }, { model: User, as: 'seller' }] },
  );

  return { message: order };
};

module.exports = { getOrdersByUser, getOrderById, updateOrder };
