const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const authToken = (payload) => jwt.sign(payload, jwtSecret, jwtConfig);

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = { 
  authToken,
  verifyToken,
};