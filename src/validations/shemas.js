const Joi = require('joi');

const errorMessages = 'Some required fields are missing';

const addLoginSchema = Joi.object({
  email: Joi.string().email().required().min(1),
  password: Joi.string().required().min(1),
})
  .messages({
    'any.required': errorMessages,
    'string.empty': errorMessages,
  });

module.exports = {
  addLoginSchema,
};