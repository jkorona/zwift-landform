class BeanScope {

  constructor(name) {
    this.name = name;
  }

  equals(beanScope) {
    return this.name === beanScope.name;
  }

}

BeanScope.SINGLETON = new BeanScope('singleton');
BeanScope.PROTOYPE = new BeanScope('prototype');

module.exports = BeanScope;
