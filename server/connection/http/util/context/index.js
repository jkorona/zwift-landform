const Context = require('./context');
const Injector = require('./extensions/injector');
const ApplicationContextBuilder = require('./application-context-builder');
const BeanScope = require('./bean-scope');
const contextConfigurator = require('./context-configurator');
const { classAnnotation } = require('./decorators/annotation');
const queries = require('./extensions/queries');

module.exports = {
  Context,
  Injector,
  ApplicationContextBuilder,
  BeanScope,
  contextConfigurator,
  classAnnotation,
  queries
};
