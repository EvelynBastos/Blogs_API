const route = require('express').Router();
const { categoryController } = require('../controllers');
const authorization = require('../middlewares/authorization');

route.post('/', authorization.validateToken, categoryController.createCategory);
route.get('/', authorization.validateToken, categoryController.getAllCategories);

module.exports = route;