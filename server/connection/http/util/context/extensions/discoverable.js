const ModuleLoader = require('../../module-loader');

class Discoverable {

  static create(context, config = {}) {
    return new Discoverable(context, config);
  }

  constructor(context, config) {
    this.context = context;
    this.config = config;
  }

  bootstrap() {
    this.context.bootstrap();
    
    return this;
  }

  has(id) {
    return this.context.has(id);
  }

  locate(id) {
    return this.context.locate(id);
  }

  locateAll(...ids) {
    return this.context.locateAll(...ids);
  }

  register() {
    return this.context.register();
  }
}
