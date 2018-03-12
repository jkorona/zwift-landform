const assert = require('assert');

const BeanScope = require('./internal/bean-scope');
const BeanRegistrationBuilder = require('./internal/bean-registration-builder');

class Context {
  constructor() {
    this.beans = {};
  }

  bootstrap() { }

  has(id) {
    return this.beans.hasOwnProperty(id);
  }

  locate(id) {
    if (this.has(id)) {
      const descriptor = this.beans[id];
      return descriptor.getInstance();
    }
    throw new Error(`Bean with id ${id} not available in context.`);
  }

  locateAll(...ids) {
    return ids.map(id => this.locate(id));
  }

  register() {
    return new BeanRegistrationBuilder(this);
  }

  save(descriptor) {
    assert(
      !this.has(descriptor.id),
      `Bean with givn ${descriptor.id} already registered.`
    );

    let recursionStop = false;
    descriptor.getInstance = () => {
      let { id, scope, instance, dependencyIds } = descriptor;

      if (!(BeanScope.SINGLETON.equals(scope) && instance)) {

        if (recursionStop) {
          assert.fail(`A cyclic dependency detected in bean ${id}`);
        }
        recursionStop = true;

        const dependencies = this.locateAll(...dependencyIds);
        instance = descriptor.factory(dependencies);
        if (BeanScope.SINGLETON.equals(scope)) {
          descriptor.instance = instance;
        }

        recursionStop = false;
      }

      return instance;
    };

    this.beans[descriptor.id] = descriptor;
  }
}

module.exports = Context;
