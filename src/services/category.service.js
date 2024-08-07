const { Category } = require('../models');
const schema = require('../middlewares/validationInputValues');

const createCategory = async (newCategory) => {
  const error = schema.newCategoryValidate(newCategory);
  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };

  await Category.create(newCategory);

  const category = await Category.findOne({ where: { name: newCategory.name } });

  return { status: 'CREATED', data: category };
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESS', data: categories };
};

module.exports = {
  createCategory,
  getAllCategories,
};