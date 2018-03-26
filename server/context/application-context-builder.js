const Context = require('./context');
const coreConfigurator = require('./configurators/core-configurator');

class ApplicationContextBuilder {

  constructor() {
    this.context = new Context();
    this.configurators = [coreConfigurator];
    this.paths = [];
  }

  static create() {
    return new ApplicationContextBuilder();
  }

  discover(config) {
    this.paths.push(path);
    return this;
  }

  configurator(fn) {
    this.configurators.push(fn);

    return this;
  }

  build(bootstrap = true) {
    this._runConfigurators();
    this._runDiscoverer();

    if (bootstrap) {
      this.context.bootstrap();
    }

    return this.context;
  }

  _runConfigurators() {
    this.configurators.forEach(configurator => configurator(this.context));
  }

  _runDiscoverer() {
    const discoverer = this.context.locate('Discoverer');
    this.paths.forEach(path => discoverer.search(path));
  }

}

module.exports = ApplicationContextBuilder;
