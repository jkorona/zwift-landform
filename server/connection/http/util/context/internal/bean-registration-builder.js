const assert = require('assert');
const BeanScope = require('../bean-scope');

class BeanRegistrationBuilder {

  constructor(store) {
    this.store = store;
    this.descriptor = {
      scope: BeanScope.SINGLETON,
      dependencyIds: [],
      eager: false
    };
  }

  withId(id) {
    this.descriptor.id = id;

    return this;
  }

  asPrototype() {
    return this.scope(BeanScope.PROTOYPE);
  }

  asSingleton() {
    return this.scope(BeanScope.SINGLETON);
  }

  scope(value) {
    this.descriptor.scope = value;
    return this;
  }

  isEager() {
    this.descriptor.eager = true;
    return this;
  }

  byInstance(instance) {
    if (!this.descriptor.id) {
      this.descriptor.id = instance.constructor.name;
    }
    assert.notEqual(this.descriptor.scope, BeanScope.PROTOYPE, 'You cannot use prototype scope with instance.');
    this.descriptor.factory = () => instance;

    this._save();
  }

  byClass(constructorFn, ...dependencyIds) {
    if (!this.descriptor.id) {
      this.descriptor.id = constructorFn.name;
    }
    this.descriptor.dependencyIds = dependencyIds;
    this.descriptor.factory = dependencies => new constructorFn(...dependencies);

    this._save();
  }

  byFactory(factoryFn, ...dependencyIds) {
    assert(this.descriptor.id, 'When registering by factory explicit ID must be provided.');

    this.descriptor.dependencyIds = dependencyIds;
    this.descriptor.factory = factoryFn;

    this._save();
  }

  _save() {
    if (this.descriptor.eager) {
      assert(BeanScope.SINGLETON.equals(this.descriptor.scope), 'Only singletons can be eager.');
    }
    
    this.store.save(this.descriptor)
  }
}

module.exports = BeanRegistrationBuilder;
