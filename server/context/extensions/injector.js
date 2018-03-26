class Injector {
  constructor(context) {
    this.context = context;
  }

  invoke(fn, dependencyIds = [], locals = []) {
    return fn(...this.context.locateAll(...dependencyIds), ...locals);
  }

  instantiate(constructorFn, dependencyIds = [], locals = []) {
    return new constructorFn(...this.context.locateAll(...dependencyIds), ...locals);
  }
}

module.exports = Injector;
