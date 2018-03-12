const Context = require("./context");
const Discoverable = require("./discoverable");
const Injector = require("./injector");

class ApplicationContextBuilder {
  
  constructor() {
    this.context = new Context();
  }

  static create() {
    return new ApplicationContextBuilder();
  }

  discoverable(config) {
    this.context = Discoverable.create(this.context);

    return this;
  }

  configurator(fn) {
    fn(this.context);

    return this;
  }

  build() {
    this.context
      .register()
      .withId("context")
      .byInstance(this.context);

    this.context
      .register()
      .withId("injector")
      .byInstance(new Injector(this.context));

    return this.context;
  }
}

module.exports = ApplicationContextBuilder;
