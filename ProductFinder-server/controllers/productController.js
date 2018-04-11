const deviceServices = require('../services/deviceServices')
const _ = require('lodash');
const responses = require('../utils').responses;

const isAUniqueProduct = (deviceId, productId, name) => {
  return new Promise((resolve, reject) => {
    deviceServices.getProduct(deviceId, productId, name)
      .then((dbResponse) => {
        let isUnique
        if (dbResponse.length) {
          isUnique = false;
        }
        else {
          isUnique = true;
        }
        resolve(isUnique)
      })
      .catch((err) => {
        reject(err)
      });
  })
}

const addNewProduct = (req, res) => {
  const deviceId = req.body.deviceId;
  const newProduct = req.body.productObj;
  isAUniqueProduct(deviceId, newProduct.productId, newProduct.name)
    .then((isUnique) => {
      if (isUnique) {
        deviceServices.addNewProduct(newProduct, deviceId)
          .then((dbResponse) => {
            if (!dbResponse) {
              returnObject = responses.NOT_FOUND_MESSAGE;
            }
            else {
              returnObject = responses.PRODUCT_SUCCESSFULLY_ADDED;
            }
            res.status(200).send(returnObject);
          })
          .catch((err) => {
            res.status(500).send(responses.DB_ERROR_MESSAGE);
          });
      }
      else {
        res.status(200).send(responses.ITEM_ALREADY_EXIST);
      }
    })
    .catch(() => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    })
}    

const getProductList = (req, res) => {
  const deviceId = req.query.deviceId
  deviceServices.getDevice(deviceId)
    .then((device) => {
      if (device.length === 0) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        const productList = device[0].productList;
        returnObject = {
          status: 200,
          productList: productList
        }
      }
      res.status(200).send(returnObject);

    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    });
}

const getProductLocation = (req, res) => {
  const deviceId = req.query.deviceId;
  const productName = req.query.productName;
  deviceServices.getDevice(deviceId)
    .then((deviceList) => {
      if (deviceList.length === 0) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        const productFound = deviceList[0].productList.find( (product) => {
          return product.name.toLowerCase() === productName;
        });
        if (!productFound) {
          returnObject = responses.NOT_FOUND_MESSAGE;
        }
        else {
          returnObject = {
            status: 200,
            productLocation: productFound.location
          }
        }
      }
      res.status(200).send(returnObject);
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    });
}

const updateProductLocation = (req, res) => {
  const deviceId = req.body.deviceId;
  const productId = req.body.productId;
  const location = req.body.location;
  deviceServices.updateProductLocation(deviceId, productId, location)
    .then((dbResponse) => {
      if (!dbResponse.n) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        returnObject = responses.PRODUCT_LOCATION_SUCCESSFULLY_UPDATED
      }
      res.status(200).send(returnObject);
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    })
}

const deleteProduct = (req, res) => {
  const deviceId = req.query.deviceId;
  const productId = req.query.productId;
  deviceServices.deleteProduct(deviceId, productId)
    .then((dbResponse) => {
      if (!dbResponse.nModified) {
        returnObject = responses.NOT_FOUND_MESSAGE;
      }
      else {
        returnObject = responses.PRODUCT_SUCCESSFULLY_DELETED
      }
      res.status(200).send(returnObject);
    })
    .catch((err) => {
      res.status(500).send(responses.DB_ERROR_MESSAGE);
    })
}

module.exports = {
  getProductList,
  addNewProduct,
  getProductLocation,
  updateProductLocation,
  deleteProduct
}
