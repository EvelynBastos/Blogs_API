const { User } = require('../models');
const authToken = require('../utils/authenticate');
const schema = require('../validations/shemas');

const login = async (credentials) => {
  const error = schema.login.validate(credentials);
  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };

  const user = await User.findOne({ where: { email: credentials.email } });

  if (!user || user.password !== credentials.password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const { email } = user;
  const token = authToken({ email });
  if (!token) {
    return;
  }
  return { status: 'SUCCESS', data: { token } };
};

module.exports = {
  login,
};