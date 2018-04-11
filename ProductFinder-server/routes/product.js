const Router = require('express').Router();
const product = require('../controllers/productController');
const validator = require('../validators').productValidators
const Authorization = require('../utils').Authorization;

Router.post('/add', Authorization, validator.addNewProduct, product.addNewProduct);
Router.get('/list', validator.getProductList, product.getProductList);
Router.get('/location', validator.getProductLocation, product.getProductLocation);
Router.post('/delete', Authorization, validator.deleteProduct, product.deleteProduct);
Router.put('/edit', Authorization, validator.updateProductLocation, product.updateProductLocation);

module.exports = Router;
