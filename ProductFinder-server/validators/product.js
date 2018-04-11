const responses = require('../utils').responses;
const LIST_PRODUCTS_PARAMS_ARRAY = [
  'deviceId'
];
const ADD_NEW_PRODUCT_BODY_ARRAY = [
  'deviceId',
  'productObj'
];
const GET_PRODUCT_LOCATION_PARAMS_ARRAY = [
  'deviceId',
  'productName'
];
const DELETE_PRODUCT_PARAMS_ARRAY = [
  'deviceId',
  'productId'
];
const UPDATE_PRODUCT_LOCATION_PARAMS_ARRAY = [
  'deviceId',
  'productId',
  'location'
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

const addNewProduct = (req, res, next) => {
  if (validator(ADD_NEW_PRODUCT_BODY_ARRAY, req.body)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }
};

const getProductList = (req, res, next) => {
  if (validator(LIST_PRODUCTS_PARAMS_ARRAY, req.query)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }
};

const getProductLocation = (req, res, next) => {
  if (validator(GET_PRODUCT_LOCATION_PARAMS_ARRAY, req.query)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }
};

const updateProductLocation = (req, res, next) => {
  if (validator(UPDATE_PRODUCT_LOCATION_PARAMS_ARRAY, req.body)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }
};

const deleteProduct = (req, res, next) => {
  if (validator(DELETE_PRODUCT_PARAMS_ARRAY, req.query)) {
    next();
  }
  else {
    res.send(responses.INVALID_PARAMS);
  }
};

module.exports = {
  addNewProduct,
  getProductList,
  getProductLocation,
  updateProductLocation,
  deleteProduct
}
