const hash = require('hash.js');

module.exports = (token) => {
  const hashedToken=hash.sha256().update(token).digest('hex');
  return hashedToken;
};
