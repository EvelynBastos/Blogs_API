const httpStatusMap = require('../utils/mapStatusHTTP');
const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await userService.login({ email, password });
  res.status(httpStatusMap(status)).json(data);
};

const createNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { status, data } = await userService.createNewUser({ displayName, email, password, image });
  res.status(httpStatusMap(status)).json(data);
};

const getAllUsers = async (req, res) => {
  const { status, data } = await userService.getAllUsers();
  res.status(httpStatusMap(status)).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.getUserById(id);
  res.status(httpStatusMap(status)).json(data);
};

module.exports = {
  login,
  createNewUser,
  getAllUsers,
  getUserById,
};