const { User } = require('../models');
const auth = require('../utils/authenticate');
const schema = require('../middlewares/validationInputValues');

const login = async (credentialUser) => {
  const error = schema.validateInput(credentialUser);
  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };

  const user = await User.findOne({ where: { email: credentialUser.email } });

  if (!user || user.password !== credentialUser.password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const { email } = user;
  const token = auth.authToken({ email });
  return { status: 'SUCCESS', data: { token } };
};

module.exports = {
  login,
};