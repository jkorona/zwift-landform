const Context = require('./context');
const ApplicationContextBuilder = require('./application-context-builder');
const BeanScope = require('./bean-scope');

const contextConfigurator = require('./configurators/context-configurator');
const nodeCoreConfigurator = require('./configurators/node-core-configurator');

const Injector = require('./extensions/injector');
const queries = require('./extensions/queries');

const { classAnnotation } = require('./decorators/annotation');

module.exports = {
  Context,
  ApplicationContextBuilder,
  BeanScope,

  contextConfigurator,
  nodeCoreConfigurator,

  Injector,
  queries,

  classAnnotation
};
