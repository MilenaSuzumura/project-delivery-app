const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await userService.login(email, password);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = { login };
