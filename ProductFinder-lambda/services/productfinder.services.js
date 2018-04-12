'use strict';

const request = require('request');
const constants = require('../utils/constants');

const getLocation = (deviceId, product) => {
  return new Promise((resolve, reject) => {
    const queryString = `?deviceId=${deviceId}&productName=${product}`;
    const url = 'https://productfinderapi.qburst.build/product/location' + queryString;
    request.get(url, (error, response, body) => {
      const bodyObject = JSON.parse(body);
      if (bodyObject.status === 200) {
        resolve(bodyObject.productLocation);
      }
      else {
        reject(bodyObject)
      }
    });
  });
}

const addNewDevice = (deviceId, email) => {
  return new Promise(function (resolve, reject) {
    const body = {
      userId: email,
      deviceId: deviceId,
      name: " ",
      productList: []
    }
    request({
      url: 'https://productfinderapi.qburst.build/device/add',
      method: 'POST',
      json: body
    }, (error, response, body) => {
      if (body.status === 200 || body.status === 409) {
        resolve(body.status);
      }
      else {
        reject();
      }
    });
  })
}

const getDeviceListOfUser = (userId) => {
  return new Promise(function (resolve, reject) {
    const queryString = `?userId=${userId}`;
    const url = 'https://productfinderapi.qburst.build/device/list' + queryString;
    request.get(url, (error, response, body) => {
      const bodyObject = JSON.parse(body);      
      if (bodyObject.status === 200 || bodyObject.status === 403) {
         resolve(bodyObject.deviceList);
      }
      else {        
        reject(bodyObject)
      }
    });
  });
  }

module.exports = {
      getLocation,
      addNewDevice,
      getDeviceListOfUser
    }
