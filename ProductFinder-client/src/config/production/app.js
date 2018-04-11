'use strict';

const StagingConfig = require('../staging/app').clazz;

class ProductionConfig extends StagingConfig {
  constructor() {
    super();
  }
}

module.exports = {
  clazz: ProductionConfig,
  instance: new ProductionConfig()
};
