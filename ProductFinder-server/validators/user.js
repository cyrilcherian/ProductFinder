const responses = require('../utils').responses
const LOGIN_USER_BODY_PARAMS_ARRAY = [
  'tokenId',
  'isAlexa'
];

validator = (expectedParams, params) => {
  let invalidParams = false;
  if (Object.keys(params).length !== expectedParams.length) {
    invalidParams = true;
  } else {
    Object.keys(params).forEach(key => {
      if (expectedParams.indexOf(key) === -1) {
        invalidParams = true;
      }
    });
  }
  return (!invalidParams);
}

const loginUser = (req, res, next) => {
  if (validator(LOGIN_USER_BODY_PARAMS_ARRAY, req.body)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }  
};

module.exports = {
  loginUser
}
