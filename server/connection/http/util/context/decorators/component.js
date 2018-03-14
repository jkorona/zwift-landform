const BeanScope = require('../bean-scope');
const { classAnnotation } = require('./annotation');

module.exports = classAnnotation(function ({ id, scope, eager = false } = {}) {
  id = id || this.class.name;
  scope = scope || BeanScope.SINGLETON;

  this.class.$$component = { id, scope, eager };
});
