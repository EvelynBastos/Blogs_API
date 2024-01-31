const { validateLoginSchema } = require('./validateLogin');
const { validateUserSchema } = require('./validateUser');

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

module.exports = {
  validateInput,
  newUserValidate,
};