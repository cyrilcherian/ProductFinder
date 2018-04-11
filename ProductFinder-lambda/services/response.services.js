'use strict';
const constants = require('../utils/constants');

const generateproductLocationResponse = (product, location) => {
  let response;
  response = `${product} is located at ${location}`;
  return response;
};
module.exports = {
  generateproductLocationResponse
}