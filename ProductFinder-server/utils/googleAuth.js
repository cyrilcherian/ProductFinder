const request = require('request');
const responses = require('./responseMessages');

module.exports = (req, res, next) => {
  const param = req.body.tokenId;  
  const url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + param;
  request
    .get(url, (error, response, body) => {
      if (response.statusCode === 200) {
        req.userData = JSON.parse(body);
          next();        
      }
      else {              
        res.send(responses.GOOGLE_AUTH_ERROR);
      }
    });
};
