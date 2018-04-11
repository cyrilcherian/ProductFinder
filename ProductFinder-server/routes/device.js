const Router = require('express').Router();
const device = require('../controllers/deviceController');
const validator = require('../validators').deviceValidators;
const Authorization = require('../utils').Authorization;

Router.post('/add', validator.addNewDevice, device.addNewDevice);
Router.get('/list', validator.getDeviceList, device.getDeviceList);
Router.put('/edit', Authorization, validator.updateDevice, device.updateDevice);
Router.post('/delete', Authorization, validator.deleteDevice, device.deleteDevice);

module.exports = Router;
