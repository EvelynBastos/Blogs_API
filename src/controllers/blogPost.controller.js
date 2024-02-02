const { blogPostService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;

  try {
    const { status, data } = await blogPostService.createPost({
      title, content, categoryIds, email,
    });
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPost = async (req, res) => {
  const { email } = req.user;
  const { status, data } = await blogPostService.getAllPost(email);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  createPost,
  getAllPost,
};