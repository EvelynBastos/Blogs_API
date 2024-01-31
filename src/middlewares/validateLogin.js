const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const validateLoginSchema = Joi.object({
  email: Joi.string().required().min(1),
  password: Joi.string().min(6).required(),
})
  .messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  });

module.exports = {
  validateLoginSchema,
};