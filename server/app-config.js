const sockets = require('socket.io');

const {
  contextConfigurator,
  nodeCoreConfigurator,
  ApplicationContextBuilder
} = require('./context');

module.exports = ApplicationContextBuilder.create()
  .discoverable({ dir: 'server' })
  .configurator(nodeCoreConfigurator)
  .configurator(contextConfigurator(function () {
    this.register().withId('sockets').byInstance(sockets);
  }))
  .build();
