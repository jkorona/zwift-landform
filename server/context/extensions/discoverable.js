const ModuleLoader = require('../internal/module-loader');

class Discoverable {

  static create(context, config = {}) {
    return new Discoverable(context, config);
  }

  constructor(context, config) {
    this.context = context;
    this.config = config;
  }

  bootstrap() {
    this.lookup();

    this.context.bootstrap();

    return this;
  }

  lookup() {
    const modules = ModuleLoader.load(this.config);

    modules.forEach((module) => {
      if (module.$$component) {
        const { id, scope, eager } = module.$$component;
        const dependencies = module.$$inject || [];

        const registration = this.register()
          .withId(id)
          .scope(scope);

        if (eager) {
          registration.isEager();
        }

        registration.byClass(module, ...dependencies);
      }
    });
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

module.exports = Discoverable;
