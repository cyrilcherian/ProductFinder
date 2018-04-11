const jwt = require('jsonwebtoken');
const responses = require('./responseMessages');

module.exports = (req, res, next) => {
  jwt.verify(req.headers.authorization, 'secret', (err) => {
    if (err) {
      res.status(401).send(responses.AUTHORIZATION_FAILED);
    }
    else {
      next();
    }
  });
};
