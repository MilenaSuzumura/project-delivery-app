const { Op } = require('sequelize');
const md5 = require('md5');

const { create } = require('../utils/token');
const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'Not found' };
  }

  const { password: _, ...data } = user;
  const infoToSend = data.dataValues;
  const token = create(infoToSend);

  return { type: null, message: { token, user: infoToSend } };
};

const register = async (name, email, password) => {
  const user = await User.findOne({ where: { [Op.or]: [{ email }, { name }] } });

  if (user) {
    return { type: 'CONFLICT', message: 'Conflict' };
  }

  const newUser = await User.create({ name, email, password: md5(password), role: 'customer' });

  const { password: _, ...data } = newUser.dataValues;
  const token = create(data);

  return { type: null, message: { ...data, token } };
};

module.exports = { login, register };
