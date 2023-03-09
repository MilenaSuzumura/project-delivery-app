const { Product, Sale, User } = require('../database/models');

const getAllOrders = async () => {
  const orders = await Sale.findAll();

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

const getOrderBySeller = async (sellerId) => {
  const orderBySeller = await Sale.findAll({ where: { sellerId } });

  return { message: orderBySeller };
};

module.exports = { getAllOrders, getOrderById, updateOrder, getOrderBySeller };
