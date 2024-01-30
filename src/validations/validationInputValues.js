const { addLoginSchema } = require('./shemas');

const validateLogin = (objectKeyValidate) => {
  const { error } = addLoginSchema.validate(objectKeyValidate);

  if (error) {
    return { status: 'BAD_REQUEST', message: error.message };
  }
};

module.exports = {
  validateLogin,
};