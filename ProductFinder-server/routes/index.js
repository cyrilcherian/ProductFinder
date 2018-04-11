const deviceRouter = require('./device');
const productRouter = require('./product');
const userRouter = require('./user');

module.exports = (app) => {
  app.use('/device', deviceRouter);
  app.use('/product', productRouter);
  app.use('/user', userRouter);
};
