const route = require('express').Router();
const { userController } = require('../controllers');
const authorization = require('../middlewares/authorization');

route.post('/', userController.createNewUser);
route.get('/', authorization.validateToken, userController.getAllUsers);

module.exports = route;