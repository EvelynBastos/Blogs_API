const { BlogPost, User, Category } = require('../models');
// const schema = require('../middlewares/validationInputValues');

// const createPost = async (postCreate) => {};

const getAllPosts = async (email) => {
  const user = await User.findOne({ where: { email } });
  const posts = await BlogPost.findAll({ 
    where: { userId: user.id },
    include: [ 
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, 
        as: 'categories', 
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] } }] });
  return { status: 'SUCCESS', data: posts };
};
  
module.exports = {
  // createPost,
  getAllPosts,
};