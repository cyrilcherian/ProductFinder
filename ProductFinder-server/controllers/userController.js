const deviceServices = require('../services/deviceServices');
const tokenGenerator = require('../utils').jwtToken;
const tokenHasher = require('../utils').hash;
const responses = require('../utils').responses;

const loginFromSystem = (newUserObj, token, res) => {
  deviceServices.isAnExistingUser(newUserObj.email)
    .then((user) => {
      if (user.length === 0) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        returnObject = {
          status: 200,
          message: 'SUCCESS',
          userId: newUserObj.email,
          token: token
        };
      }
      res.status(200).send(returnObject);
    })
    .catch(() => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    });
}

const loginFromAlexa = (newUserObj, token, res) => {
  returnObject = {
    status: 200,
    message: 'SUCCESS',
    userId: newUserObj.email,
    token: token
  };
res.status(200).send(returnObject); 
}

const loginUser = (req, res) => {
  const signinTime = new Date();
  const newUserObj = {
    email: req.userData.email,
    time: signinTime.toString()
  };
  const token = tokenGenerator(newUserObj);
  const hashedToken = tokenHasher(token);
  newUserObj.token = hashedToken;
  const isAlexa = req.body.isAlexa;
  if (isAlexa) {
    loginFromAlexa(newUserObj, token, res);
  }
  else {
    loginFromSystem(newUserObj, token, res);
  }
}

module.exports = {
  loginUser
}
