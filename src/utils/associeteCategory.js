const { PostCategory } = require('../models');

const associateCategoryPost = async (postId, categoryIds, transaction) => {
  const mapOfPostCategory = categoryIds.map((categoryId) => ({ postId, categoryId }));
  console.log(mapOfPostCategory);
  await PostCategory.bulkCreate(mapOfPostCategory, transaction);
};

module.exports = {
  associateCategoryPost,
};