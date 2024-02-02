const { validateLoginSchema } = require('./validateLogin');
const { validateUserSchema } = require('./validateUser');
const { validateCategorySchema } = require('./validateCategory');
const { validateBlogPostSchema } = require('./validateBlogPost');
const { validateUpdateBlogPostSchema } = require('./validateBlogPost');

const validateInput = (objectKey) => {
  const { error } = validateLoginSchema.validate(objectKey);
  if (error) {
    return { status: 'BAD_REQUEST', message: error.message };
  }
};

const newUserValidate = (objectKey) => {
  const { error } = validateUserSchema.validate(objectKey);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const newCategoryValidate = (objectKey) => {
  const { error } = validateCategorySchema.validate(objectKey);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const newBlogPostValidate = (objectKey) => {
  const { error } = validateBlogPostSchema.validate(objectKey);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const updateBlogPostValidate = (objectKey) => {
  const { error } = validateUpdateBlogPostSchema.validate(objectKey);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

module.exports = {
  validateInput,
  newUserValidate,
  newCategoryValidate,
  newBlogPostValidate,
  updateBlogPostValidate,
};