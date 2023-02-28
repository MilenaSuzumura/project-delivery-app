const jwt = require('jsonwebtoken');
const SECRET = require('../../jwt.evaluation.key');

const confidential = SECRET;

const jwtConfig = {
  algarithm: 'HS256',
  expiresIn: '1d',
};

const createToken = (pass) => {
  const token = jwt.sign({ data: { userId: pass } },
    confidential, jwtConfig);
  
    return token;
};

module.exports = { createToken };