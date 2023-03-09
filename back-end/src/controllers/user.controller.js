const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await userService.login(email, password);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { type, message } = await userService.register(name, email, password);

  if (type) {
    return res.status(409).json({ message });
  }

  return res.status(201).json(message);
};

const getSellers = async (_req, res) => {
  const { message } = await userService.getSellers();

  return res.status(200).json(message);
};

module.exports = { login, register, getSellers };
