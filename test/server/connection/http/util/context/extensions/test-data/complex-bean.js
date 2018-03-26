const { Component, Inject } = require('../../../../../../../../server/context/decorators');

@Component()
@Inject()
class ComplexBean {

  constructor(simple) {
    this.simple = simple;
  }

}

module.exports = ComplexBean;
