const deviceServices = require('../services/deviceServices')
const _ = require('lodash');
const responses = require('../utils').responses;

const isUniqueId = (deviceId) => {
  return new Promise((resolve, reject) => {
    deviceServices.getDevice(deviceId)
      .then((device) => {
        if (device.length === 0) {
          isUnique = 1;
          resolve(isUnique);
        }
        else {
          isUnique = 0;
          resolve(isUnique);
        }
      })
      .catch((err) => {
        reject(err);
      })
  })
}

const addNewDevice = (req, res) => {
  isUniqueId(req.body.deviceId)
    .then((unique) => {
      if (unique) {
        deviceServices.addNewDevice(req.body)
          .then((device) => {        
            res.status(200).send(responses.DEVICE_SUCCESSFULLY_ADDED);
          })
          .catch((err) => {
            res.status(500).send(responses.DB_ERROR_MESSAGE);
          });
      }
      else {    
        res.status(200).send(responses.ITEM_ALREADY_EXIST);
      }
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    })
}

const getDeviceList = (req, res) => {
  const userId = req.query.userId;
  deviceServices.listAllDevicesOfUser(userId)
    .then((deviceList) => {
      returnObject = {
        status: 200,
        deviceList: deviceList
      }
      res.status(200).send(returnObject);
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    });
}

const updateDevice = (req, res) => {
  const deviceId = req.body.deviceId;
  const newName = req.body.name;
  deviceServices.updateDeviceName(deviceId, newName)
    .then((dbResponse) => {
      if (!dbResponse) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        returnObject = responses.DEVICE_NAME_SUCCESSFULLY_CHANGED
      }
      res.status(200).send(returnObject);
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    });
}

const deleteDevice = (req, res) => {
  const deviceId = req.query.deviceId;
  deviceServices.deleteDevice(deviceId)
    .then((dbResponse) => {
      if (!dbResponse) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        returnObject = responses.DEVICE_SUCCESSFULLY_DELETED
      }
      res.status(200).send(returnObject);
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    });
}

module.exports = {
  addNewDevice,
  getDeviceList,
  updateDevice,
  deleteDevice
}
