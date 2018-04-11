const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  userId:{ 
    type: String,
    required:true
  },
  deviceId:{ 
    type: String,
    required:true
  },
  name: {   
    type:String,
    required:false
  },               
  productList: { 
    type: [{
      productId: {type: String },
      name: {type: String },
      location: {type: String }
    }]
  }
},{VersionKey:false});
const devicemodel = mongoose.model('Model',deviceSchema,'collection1');

module.exports = devicemodel;
