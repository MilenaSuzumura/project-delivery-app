const token = require('../utils/token');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  req.body.user = token.verify(authorization);

  next();
};

module.exports = validateToken;
