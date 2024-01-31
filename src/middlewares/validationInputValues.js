const { validateLoginSchema } = require('./validateLogin');

const validateInput = (objectKey) => {
  const { error } = validateLoginSchema.validate(objectKey);

  if (error) {
    return { status: 'BAD_REQUEST', message: error.message };
  }
};

module.exports = {
  validateInput,
};