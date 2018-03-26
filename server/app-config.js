const sockets = require('socket.io');

const {
  contextConfigurator,
  nodeCoreConfigurator,
  ApplicationContextBuilder
} = require('./context');


const appConfigurator = contextConfigurator(function () {
  this.extend(nodeCoreConfigurator);
  this.discover({ dir: 'server' });

  this.register().withId('sockets').byInstance(sockets);
});


module.exports = ApplicationContextBuilder.create()
  .configurator(appConfigurator)
  .build();
