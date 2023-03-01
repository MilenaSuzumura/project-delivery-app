const fs = require('fs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key');

const create = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  
  return token;
};

const verify = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);

  return payload;
};

module.exports = { create, verify };
