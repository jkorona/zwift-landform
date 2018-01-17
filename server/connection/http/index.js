const HttpServer = require('./server');

const HttpController = require('./http-controller.decorator');
const Endpoint = require('./endpoint.decorator');

module.exports = {
  HttpController,
  HttpServer,
  Endpoint
};
