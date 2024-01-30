const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';

const authToken = (user) => {
  const jwtConfig = {
    expiresIn: '2d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(
    user,
    jwtSecret,
    jwtConfig,
  );

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

module.exports = { 
  authToken,
  verifyToken,
};