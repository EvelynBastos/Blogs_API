const httpStatusMap = require('../utils/mapStatusHTTP');
const userService = require('../services/user.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { status, data } = await userService.login({ email, password });
  res.status(httpStatusMap(status)).json(data);
};

module.exports = {
  login,
};