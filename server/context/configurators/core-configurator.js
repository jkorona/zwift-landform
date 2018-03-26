const contextConfigurator = require('./context-configurator');

const Discoverer = require('../extensions/discoverer');
const Injector = require('../extensions/injector');

module.exports = contextConfigurator(function (context) {
  this.register().withId('context').byInstance(context);
  this.register().withId('injector').byInstance(new Injector(context));
  this.register().byInstance(Discoverer.create(context));
});
