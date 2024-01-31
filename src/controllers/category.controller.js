const categoryService = require('../services/category.service');
const httpStatusMap = require('../utils/mapStatusHTTP');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.createCategory({ name });
  res.status(httpStatusMap(status)).json(data);
};

const getAllCategories = async (req, res) => {
  const { id, name } = req.body;
  const { status, data } = await categoryService.getAllCategories({ id, name });
  res.status(httpStatusMap(status)).json(data);
};
module.exports = {
  createCategory,
  getAllCategories,
};