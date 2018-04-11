class DevelopmentConfig {
  constructor() {
    this.environment = process.env.NODE_ENV;
    this.baseUrl = 'http://10.4.6.37:8001';
  }
}

module.exports = {
  clazz: DevelopmentConfig,
  instance: new DevelopmentConfig()
};  