const route = require('express').Router();
const { blogPostController } = require('../controllers');
const authorization = require('../middlewares/authorization');

route.post('/', authorization.validateToken, blogPostController.createPost);
route.get('/', authorization.validateToken, blogPostController.getAllPost);
route.get('/:id', authorization.validateToken, blogPostController.getPostById);

module.exports = route;