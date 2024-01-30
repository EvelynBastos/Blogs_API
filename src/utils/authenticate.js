const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';

const authToken = (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(
    { username: user.email },
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