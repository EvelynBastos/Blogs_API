const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const validateBlogPostSchema = Joi.object({
  title: Joi.string().required().min(1),
  content: Joi.string().required().min(1),
  categoryIds: Joi.array().required().min(1),
  email: Joi.string(),

})
  .messages({
    'string.empty': errorMessage,
    'any.required': errorMessage,
    'array.min': 'one or more "categoryIds" not found',
  });

const validateUpdateBlogPostSchema = Joi.object({
  title: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
})
  .messages({
    'string.empty': errorMessage,
    'any.required': errorMessage,
  });

module.exports = {
  validateBlogPostSchema,
  validateUpdateBlogPostSchema,
};