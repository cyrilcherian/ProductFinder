const Router = require('express').Router();
const user = require('../controllers/userController');
const validator = require('../validators').userValidators;
const googleAuth = require('../utils').googleAuth;

Router.post('/login', validator.loginUser, googleAuth, user.loginUser ); 

module.exports = Router;
