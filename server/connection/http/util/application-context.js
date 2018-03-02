const assert = require("assert");

class ApplicationContext {
  constructor() {
    this.beans = {};
  }

  invoke(fn, dependencyIds, locals) {
    return fn(...this.locateAll(dependencyIds), ...locals);
  }

  instantiate(constructorFn, dependencyIds, locals) {
    return new constructorFn(...this.locateAll(dependencyIds), ...locals);
  }

  register() {
    return new BeanRegistrationBuilder(this);
  }

  has(id) {
    return this.beans.hasOwnProperty(id);
  }

  locate(id) {
    const descriptor = this.beans[id];
    return descriptor.getInstance();
  }

  locateAll(...ids) {
    return ids.map((id) => this.locate(id));
  }

  _store(descriptor) {
    assert(
      !this.has(descriptor.id),
      `Bean with givn ${descriptor.id} already registered.`
    );

    let recursionStop = false;
    descriptor.getInstance = function getInstance() {
      let { id, scope, instance, dependencyIds } = descriptor;

      if (!(scope === "singleton" || instance)) {
        if (recursionStop) {
          assert.fail(`A cyclic dependency detected in bean ${id}`);
        }
        recursionStop = true;

        const dependencies = this.locateAll(this.descriptor);
        instance = descriptor.factory(dependencies);
        if (scope === "singleton") {
          descriptor.instance = instance;
        }

        recursionStop = false;
      }

      return instance;
    };

    this.beans[descriptor.id] = descriptor;
  }
}

class BeanRegistrationBuilder {
  constructor(context) {
    this.context = context;
    this.descriptor = {
      scope: "singleton",
      dependencyIds: []
    };
  }

  withId(id) {
    this.descriptor.id = id;
    return this;
  }

  asPrototype() {
    descriptor.scope = "prototype";
  }

  asSingleton() {
    descriptor.scope = "singleton";
  }

  byInstance(instance) {
    if (!this.descriptor.id) {
      this.descriptor.id = instance.constructor.name;
    }
    this.descriptor.factory = () => instance;
    return this;
  }

  byClass(constructorFn, ...dependencyIds) {
    if (!this.descriptor.id) {
      this.descriptor.id = constructorFn.name;
    }
    this.descriptor.dependencyIds = dependencyIds;
    this.descriptor.factory = dependencies =>
      new constructorFn(...dependencies);
    return this;
  }

  byFactory(factoryFn, ...dependencyIds) {
    this.descriptor.dependencyIds = dependencyIds;
    this.descriptor.factory = factory;
    return this;
  }

  register() {
    this.context._store(this.descriptor);
  }
}

module.exports = ApplicationContext;
