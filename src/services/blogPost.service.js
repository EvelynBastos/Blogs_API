const { BlogPost, User, Category } = require('../models');
const { newBlogPostValidate,
  newCategoryValidate, updateBlogPostValidate } = require('../middlewares/validationInputValues');
const { associateCategoryPost } = require('../utils/associeteCategory');

const createPost = async (dataPost) => {
  const error = newBlogPostValidate(dataPost);
  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };
  const promiseId = dataPost.categoryIds.map((id) => Category.findByPk(id));
  const categories = await Promise.all(promiseId);
  if (categories.some((category) => category === null)) {
    return { status: 'BAD_REQUEST', data: { message: 'one or more "categoryIds" not found' } };
  } 
  try {
    newCategoryValidate(dataPost.categoryIds);
  } catch (e) {
    throw new Error(e.message);
  } const user = await User.findOne({ where: { email: dataPost.email } });
  const newPost = await BlogPost.create({ ...dataPost, userId: user.id });
  await associateCategoryPost(newPost.id, dataPost.categoryIds);
  return { status: 'CREATED', data: newPost };
};
const getAllPost = async (email) => {
  const user = await User.findOne({ where: { email } });
  const posts = await BlogPost.findAll({ where: { userId: user.id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, 
        as: 'categories', 
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] } }] });
  return { status: 'SUCCESS', data: posts };
};
const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] } }] });
  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESS', data: post };
};
const updatePost = async (id, dataPost, email) => {
  const error = updateBlogPostValidate(dataPost);
  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };
  const user = await User.findOne({ where: { email } });
  const post = await BlogPost.findOne({ where: { id, userId: user.id } });
  if (!post) return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  await BlogPost.update(dataPost, { where: { id } });
  const updatedPost = await getPostById(id);
  return { status: 'SUCCESS', data: updatedPost.data };
};
module.exports = {
  getAllPost,
  createPost,
  getPostById,
  updatePost,
};