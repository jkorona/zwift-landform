const BeanScope = require('../bean-scope');
const { classAnnotation } = require('./annotation');

module.exports = classAnnotation(function component({ id, scope, eager = false } = {}) {
  id = id || this.class.name;
  scope = scope || BeanScope.SINGLETON;

  return { id, scope, eager };
});
