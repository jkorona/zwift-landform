const Context = require('./context');

const Discoverable = require('./extensions/discoverable');
const Injector = require('./extensions/injector');

class ApplicationContextBuilder {

  constructor() {
    this.context = new Context();
    this.configurators = [];
  }

  static create() {
    return new ApplicationContextBuilder();
  }

  discoverable(config) {
    this.context = Discoverable.create(this.context, config);

    return this;
  }

  configurator(fn) {
    this.configurators.push(fn);

    return this;
  }

  build(bootstrap = true) {
    this.context
      .register()
      .withId('context')
      .byInstance(this.context);

    this.context
      .register()
      .withId('injector')
      .byInstance(new Injector(this.context));

    this.configurators.forEach(configurator => configurator(this.context));

    if (bootstrap) {
      this.context.bootstrap();
    }

    return this.context;
  }
}

module.exports = ApplicationContextBuilder;
