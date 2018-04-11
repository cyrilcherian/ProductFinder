'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = undefined;
const intentController = require('./controllers/intent.controller');

const handlers = {
  'LaunchRequest': function () {
    intentController.getLaunchRequest.call(this);
  },
  'RegisterIntent': function () {
    intentController.registerNewDevice.call(this);   
  },
  'LocateProduct': function () {
    intentController.getProductLocation.call(this);
  },
  'AMAZON.HelpIntent': function () {
    intentController.getAmazonHelpIntent.call(this);
  },
  'AMAZON.CancelIntent': function () {
    intentController.getAmazonCancelIntent.call(this);
  },
  'AMAZON.StopIntent': function () {
    intentController.getAmazonStopIntent.call(this);
  },
};

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
