const { BlogPost, Category, User, PostCategory } = require('../models');
const schema = require('../middlewares/validationInputValues');

const createPost = async (blog) => {
  const error = schema.newBlogPostValidate(blog);
  const { title, content, categoryIds, email } = blog;
  if (error) return { status: 'BAD_REQUEST', data: { message: error.message } };
  try {
    const arrayPromises = categoryIds.map(async (id) => {
      const category = await Category.findByPk(id);
      if (!category) throw new Error('one or more "categoryIds" not found');
    });
    await Promise.all(arrayPromises);
  } catch (e) { return { status: 'BAD_REQUEST', data: { message: e.message } }; }
  const thisUser = await User.findOne({ where: { email: blog.email } });
  const thisPost = await BlogPost.create({ 
    title,
    content,
    categoryIds,
    email,
    userId: thisUser.id,
    published: Date.now(),
    updated: Date.now(),
  });
  await PostCategory.bulkCreate([
    { postId: thisPost.id, categoryId: 1 },
    { postId: thisPost.id, categoryId: 2 },
  ]);
  return { status: 'CREATED', data: thisPost };
};

module.exports = {
  createPost,
};