const constants = require('../utils/constants');
const responses = require('../services/response.services')
const productFinder = require('../services/productfinder.services')
const jwtParser = require('../utils/jwtParser')
const _ = require('lodash');

module.exports = {
  getLaunchRequest: function () {
    validator(this.event)
      .then(() => {
        const deviceId = this.event.context.System.device.deviceId;
        const token = this.event.session.user.accessToken;
        const jwtObject = jwtParser(token);
        checkDeviceRegistration(jwtObject.email, deviceId)
          .then((registered) => {
            if (registered) {
              this.emit(':ask', constants.WELCOME_RESPONSE_REGISTERED_DEVICE, constants.REPROMPT_WAITING);
            }
            else {
              this.emit(':ask', constants.WELCOME_RESPONSE_UNREGISTERED_DEVICE, constants.REPROMPT_WAITING);
            }
          })
          .catch(() => {
            this.emit(':tell', constants.ERROR_MESSAGE, constants.REPROMPT_WAITING);
          })
      })
      .catch(() => {
        this.emit(':tellWithLinkAccountCard', constants.CARD_NOTIFICATION);
      })
  },

  registerNewDevice: function () {
    validator(this.event)
      .then(() => {
        const deviceId = this.event.context.System.device.deviceId;
        const token = this.event.session.user.accessToken;
        const jwtObject = jwtParser(token);
        productFinder.addNewDevice(deviceId, jwtObject.email)
          .then((status) => {
            if (status === 200) {
              this.emit(':tell', constants.DEVICE_REGISTRATION_SUCCESS, constants.REPROMPT_WAITING);
            }
            else {
              this.emit(':ask', constants.DEVICE_ALREADY_REGISTERED, constants.REPROMPT_WAITING);
            }
          })
          .catch(() => {
            this.emit(':ask', constants.DEVICE_REGISTRATION_FAILED, constants.REPROMPT_WAITING);
          });
      })
      .catch(() => {
        this.emit(':tell', constants.ENABLE_AGAIN, constants.REPROMPT_WAITING);
      })
  },

  getProductLocation: function () {
    validator(this.event)
      .then(() => {
        const deviceId = this.event.context.System.device.deviceId;
        const token = this.event.session.user.accessToken;
        const jwtObject = jwtParser(token);
        let product = _.get(this.event,
          `request.intent.slots.product.value`, null);
        if (product) {
          product = product.toLowerCase();
          checkDeviceRegistration(jwtObject.email, deviceId)
            .then((registered) => {
              if (registered) {
                productFinder.getLocation(deviceId, product)
                  .then((productLocation) => {
                    this.emit(':tell', responses.generateproductLocationResponse(product, productLocation), constants.REPROMPT_WAITING);
                  })
                  .catch((err) => {
                    this.emit(':ask', constants.PRODUCT_NOT_FOUND, constants.REPROMPT_WAITING);
                  })
              }
              else {
                this.emit(':ask', constants.DEVICE_NOT_REGISTERED, constants.REPROMPT_WAITING);
              }
            })
            .catch(() => {
              this.emit(':tell', constants.ERROR_MESSAGE, constants.REPROMPT_WAITING);
            });
        }
        else {
          this.emit(':ask', constants.MENTION_PRODUCT, constants.REPROMPT_WAITING);
        }
      })
      .catch(() => {
        this.emit(':tell', constants.ENABLE_AGAIN, constants.REPROMPT_WAITING);
      });
  },

  getAmazonHelpIntent: function () {
    this.emit(':ask', constants.HELP_RESPONSE, constants.REPROMPT_WAITING);
  },

  getAmazonCancelIntent: function () {
    this.emit(':tell', constants.STOP_RESPONSE);
  },

  getAmazonStopIntent: function () {
    this.emit(':tell', constants.STOP_RESPONSE);
  },

  getSessionEndedRequest: function () {
    this.emit(':tell', constants.STOP_RESPONSE);
  }
}

//HELPER FUNCTIONS

const checkDeviceRegistration = (userId, deviceId) => {
  return new Promise(function (resolve, reject) {
    productFinder.getDeviceListOfUser(userId)
      .then((deviceList) => {
        let deviceFound
        if (deviceList) {
          deviceFound = deviceList.find(device => device.deviceId === deviceId);
        }
        else {
          deviceFound = null;
        }
        resolve(deviceFound)
      })
      .catch((err) => {
        reject()
      })
  })
}

const validator = (eventObject) => {
  return new Promise(function (resolve, reject) {
    const deviceId = _.get(eventObject,
      `context.System.device.deviceId`, null);
    const token = _.get(eventObject,
      `session.user.accessToken`, null);
    const isValid = deviceId && token;
    if (isValid) {
      resolve()
    }
    else {
      reject()
    }
  })
};
