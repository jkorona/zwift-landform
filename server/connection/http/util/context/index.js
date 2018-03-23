const Context = require('./context');
const ApplicationContextBuilder = require('./application-context-builder');
const contextConfigurator = require('./context-configurator');
const BeanScope = require('./bean-scope');

const Injector = require('./extensions/injector');
const queries = require('./extensions/queries');
const nodeModulesConfigurator = require('./extensions/node-modules-configurator');

const { classAnnotation } = require('./decorators/annotation');

module.exports = {  
  Context,
  ApplicationContextBuilder,
  contextConfigurator,
  BeanScope,

  Injector,
  queries,
  nodeModulesConfigurator,

  classAnnotation
};
