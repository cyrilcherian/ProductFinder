const jwt = require('jsonwebtoken');

module.exports = (newUserObj) => {
  const token = jwt.sign(newUserObj, 'secret');
  return token;
};
