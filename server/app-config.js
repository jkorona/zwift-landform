const sockets = require('socket.io');

const {
  contextConfigurator,
  nodeModulesConfigurator,
  ApplicationContextBuilder
} = require('./connection/http/util/context');

module.exports = ApplicationContextBuilder.create()
  .discoverable({ dir: 'server' })
  .configurator(nodeModulesConfigurator)
  .configurator(contextConfigurator(function () {
    this.register().withId('sockets').byInstance(sockets);
  }))
  .build();