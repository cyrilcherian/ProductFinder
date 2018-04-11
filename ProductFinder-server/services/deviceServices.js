const deviceModel = require('../models/deviceSchema');
const mongoose = require('mongoose');

//DEVICE SERVICES

const addNewDevice = (deviceObj) => {
  const newdevice = new deviceModel(deviceObj);
  return newdevice.save()
}

const listAllDevicesOfUser = (userId) => {
  return new Promise( (resolve, reject) => {
    deviceModel.find({ userId: userId })
      .then((devices) => {
        let deviceList = [];
        devices.forEach( (device) => {
          deviceObject = {
            deviceId: device.deviceId,
            name: device.name
          }
          deviceList.push(deviceObject);
        });
        resolve(deviceList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const getDevice = (deviceId) => {
  return new Promise( (resolve, reject) => {
    deviceModel.find({ deviceId: deviceId })
      .then((device) => {
        resolve(device);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const updateDeviceName = (deviceId, name) => {
  return new Promise( (resolve, reject) => {
    deviceModel.findOneAndUpdate({ deviceId: deviceId }, { $set: { name: name } })
      .then((dbResponse) => {
        resolve(dbResponse);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const deleteDevice = (deviceId) => {
  return deviceModel.findOneAndRemove({ deviceId: deviceId });
}

//PRODUCT SERVICES

const addNewProduct = (productObj, deviceId) => {
  return new Promise( (resolve, reject) => {
    deviceModel.findOneAndUpdate({ deviceId: deviceId }, { $push: { productList: productObj } })
      .then((dbResponse) => {
        resolve(dbResponse);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

const getProduct = (deviceId, productId, name) => {
  return new Promise((resolve, reject) => {
    deviceModel.find({ deviceId: deviceId ,productList: {$elemMatch: {$or:[{productId:productId},{name:name}]}}})
      .then((dbResponse) => {
        resolve(dbResponse);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

const updateProductLocation = (deviceId, productId, location) => {
  return new Promise((resolve, reject) => {
    deviceModel.update({ deviceId: deviceId , 'productList.productId': productId },{$set: { 'productList.$.location': location } } )
      .then((dbResponse) => {
        resolve(dbResponse);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

const deleteProduct = (deviceId, productId) => {
  return new Promise((resolve, reject) => {
    deviceModel.update({ deviceId: deviceId }, { $pull: { productList: { productId: productId } } })
      .then((dbResponse) => {
        resolve(dbResponse);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

//USER SERVICES

const isAnExistingUser = (userId) => {
  return new Promise( (resolve, reject) => {
    deviceModel.find({ userId: userId })
      .then((device) => {
        resolve(device);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  addNewDevice,
  listAllDevicesOfUser,
  updateDeviceName,
  deleteDevice,
  getDevice,
  addNewProduct,
  getProduct,
  updateProductLocation,
  deleteProduct,
  isAnExistingUser
}
