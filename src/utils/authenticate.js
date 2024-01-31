const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';

const authToken = (user) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign({ username: user.email }, jwtSecret, jwtConfig);
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

module.exports = { 
  authToken,
  verifyToken,
};