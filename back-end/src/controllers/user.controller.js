const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.login(email, password);

  return res.status(200).json(result);
};

module.exports = { login };
