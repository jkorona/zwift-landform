const sockets = require('socket.io');

const {
  contextConfigurator,
  nodeModulesConfigurator,
  ApplicationContextBuilder
} = require('./context');

module.exports = ApplicationContextBuilder.create()
  .discoverable({ dir: 'server' })
  .configurator(nodeModulesConfigurator)
  .configurator(contextConfigurator(function () {
    this.register().withId('sockets').byInstance(sockets);
  }))
  .build();