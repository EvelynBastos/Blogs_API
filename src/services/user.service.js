const { User } = require('../models');
const auth = require('../utils/authenticate');
const schema = require('../middlewares/validationInputValues');
const { validateUserSchema } = require('../middlewares/validateUser');

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

const createNewUser = async (newUser) => {
  const { error } = validateUserSchema.validate(newUser);

  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };

  const user = await User.findOne({
    where: { email: newUser.email },
  });

  if (user && newUser.email === user.email) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  await User.create(newUser);

  const { displayName, email } = newUser;
  const token = auth.authToken({ displayName, email });

  return { status: 'CREATED', data: { token } };
};

const getAllUsers = async () => {
  const users = await User.findAll(
    { attributes: { exclude: ['password'] } },
  );
  return { status: 'SUCCESS', data: users };
};

const getUserById = async (id) => {
  const user = await User.findOne({ attributes: { exclude: ['password'] }, where: { id } });
  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  return { status: 'SUCCESS', data: user };
};

module.exports = {
  login,
  createNewUser,
  getAllUsers,
  getUserById,
};