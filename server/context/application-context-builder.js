const Context = require('./context');

const Discoverer = require('./extensions/discoverer');
const Injector = require('./extensions/injector');

class ApplicationContextBuilder {

  constructor() {
    this.context = new Context();
    this.configurators = [];
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
    this._registerBasics();
    this._runConfigurators();
    this._runDiscoverer();

    if (bootstrap) {
      this.context.bootstrap();
    }

    return this.context;
  }

  _registerBasics() {
    this.context
      .register()
      .withId('context')
      .byInstance(this.context);

    this.context
      .register()
      .withId('injector')
      .byInstance(new Injector(this.context));
  }

  _runConfigurators() {
    this.configurators.forEach(configurator => configurator(this.context));
  }

  _runDiscoverer() {
    const discoverer = Discoverer.create(this.context);
    this.paths.forEach(path => discoverer.search(path));
  }

}

module.exports = ApplicationContextBuilder;
