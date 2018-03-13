const { Component, Inject } = require('../../../../../../../../server/connection/http/util/context/decorators');

@Component()
@Inject()
class ComplexBean {

  constructor(simple) {
    this.simple = simple;
  }

}

module.exports = ComplexBean;
