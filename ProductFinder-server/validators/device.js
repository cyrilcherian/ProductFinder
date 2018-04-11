const responses = require('../utils').responses;
const LIST_DEVICES_PARAMS_ARRAY = [
  'userId'
];
const ADD_NEW_DEVICE_BODY_ARRAY = [
  'userId',
  'deviceId',
  'name',
  'productList'
];
const DELETE_DEVICE_PARAMS_ARRAY = [
  'deviceId'
];
const UPDATE_DEVICE_PARAMS_ARRAY = [
  'deviceId',
  'name'
]

const validator = (expectedParams, params) => {
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

const getDeviceList = (req, res, next) => {
  if (validator(LIST_DEVICES_PARAMS_ARRAY, req.query)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }  
};

const addNewDevice = (req, res, next) => {
  if (validator(ADD_NEW_DEVICE_BODY_ARRAY, req.body)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }  
};
const updateDevice = (req, res, next) => {
  if (validator(UPDATE_DEVICE_PARAMS_ARRAY, req.body)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }  
}

const deleteDevice = (req, res, next) => {
  if (validator(DELETE_DEVICE_PARAMS_ARRAY, req.query)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }  
};

module.exports = {
  getDeviceList,
  addNewDevice,
  updateDevice,
  deleteDevice
}
