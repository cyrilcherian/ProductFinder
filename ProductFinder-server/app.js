const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/index.js')
const config = require('./config/config');
const app = express();

app.use(bodyParser.json());
app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'origin, content-type, accept, authorization');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET');
  next();
});

mongoose.connect(config.url, (err, database) => {
  if (err) {
    console.log("CONNECTION ERROR");
  }
  else {
    route(app);
    app.listen(config.port, () => {
      console.log('Example app listening on port ' + config.port);
    });
  }
})