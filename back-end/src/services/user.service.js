const md5 = require('md5');

const { create } = require('../utils/token');
const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password', 'id'] },
  });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'Not found' };
  }

  const { password: _, ...data } = user;
  const token = create(data.dataValues);

  return { type: null, message: token };
};

const register = async (name, email, password) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    return { type: 'CONFLICT', message: 'Conflict' };
  }

  const newUser = await User.create({ name, email, password: md5(password), role: 'customer' });

  return { type: null, message: newUser };
};

module.exports = { login, register };
