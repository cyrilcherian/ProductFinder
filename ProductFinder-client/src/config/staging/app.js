'use strict';

const DevelopmentConfig = require('../development/app').clazz;

class StagingConfig extends DevelopmentConfig {
  constructor() {
    super();
    this.baseUrl = 'https://productfinderapi.qburst.build';
  }
}

module.exports = {
  clazz: StagingConfig,
  instance: new StagingConfig()
};
