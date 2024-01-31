const Joi = require('joi');

const validateCategorySchema = Joi.object({
  name: Joi.string().required().min(1),
});

module.exports = {
  validateCategorySchema,
};