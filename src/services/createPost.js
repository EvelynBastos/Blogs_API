const { 
  newBlogPostValidate,
  newCategoryValidate,
} = require('../middlewares/validationInputValues');
const { associateCategoryPost } = require('../utils/associeteCategory');
const { BlogPost, User, Category } = require('../models');

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
  }
  const user = await User.findOne({ where: { email: dataPost.email } });
  const newPost = await BlogPost.create({ ...dataPost, userId: user.id });
  await associateCategoryPost(newPost.id, dataPost.categoryIds);
  
  return { status: 'CREATED', data: newPost };
};
module.exports = createPost;