const ModuleLoader = require('../internal/module-loader');

class Discoverer {

  static create(context,) {
    return new Discoverable(context);
  }

  constructor(context) {
    this.context = context;
  }

  search(config) {
    const context = this.context;
    const modules = ModuleLoader.load(this.config);

    modules.forEach((module) => {
      if (module.$$component) {
        const { id, scope, eager } = module.$$component;
        const dependencies = module.$$inject || [];

        const registration = context.register()
          .withId(id)
          .scope(scope);

        if (eager) {
          registration.isEager();
        }

        registration.byClass(module, ...dependencies);
      }
    });
  }
  
}

module.exports = Discoverer;
