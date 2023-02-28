const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.login(email, password);

  if (!result) return res.status(404).json({ message: 'Not found' });

  return res.status(200).json(result);
};

module.exports = { login };
