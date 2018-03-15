const fs = require('fs');
const http = require('http');
const path = require('path');

const contextConfigurator = require('../context-configurator');

module.exports = contextConfigurator(function () {
  this.register().withId('fs').byInstance(fs);
  this.register().withId('http').byInstance(http);
  this.register().withId('path').byInstance(path);
});
