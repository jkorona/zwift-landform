const Context = require('./context');

const Discoverable = require('./extensions/discoverable');
const Injector = require('./extensions/injector');

const nodeStdConfigurator = require('./internal/node-std-configurator');

class ApplicationContextBuilder {

  constructor() {
    this.context = new Context();
    this.configurators = [];
  }

  static create() {
    return new ApplicationContextBuilder();
  }

  discoverable(config) {
    this.context = Discoverable.create(this.context);

    return this;
  }

  includeStd() {
    return this.configurator(nodeStdConfigurator)
  }

  configurator(fn) {
    this.configurators.push(fn);

    return this;
  }

  build() {
    this.context
      .register()
      .withId('context')
      .byInstance(this.context);

    this.context
      .register()
      .withId('injector')
      .byInstance(new Injector(this.context));

    this.configurators.forEach(configurator => configurator(this.context));
    this.context.bootstrap();

    return this.context;
  }
}

module.exports = ApplicationContextBuilder;
