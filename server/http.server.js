const http = require('http');
const fs = require('fs');

const DEFAULT_CONFIG = {
  port: 3000
};

function callApi(handler, response) {
  Promise.resolve(handler())
    .then((data) => {
      response.writeHead('200', { 'Content-Type': 'application/json' })
      response.write(JSON.stringify(data));
      response.end();
    });
}

function redirectToIndex(response) {
  response.writeHead(301, { 'Content-Type': 'text/html', 'Location': '/' });
  response.end();
}

function sendIndexHtml(response) {
  fs.readFile('client/index.html', function (err, data) {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
}

function createHttpHandler(resourceHandlers) {
  return function httpHandler(request, response) {
    console.log(`Retrieved request to url ${request.url}...`);

    const resourceName = request.url.substr(1);

    if (resourceName) {
      if (resourceHandlers.hasOwnProperty(resourceName)) {
        callApi(resourceHandlers[resourceName], response);
      } else {
        redirectToIndex(response);
      }
    } else {
      sendIndexHtml(response);
    }
  };
}

module.exports = {
  start(resourceHandlers = {}, config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config);

    const server = http
      .createServer(createHttpHandler(resourceHandlers))
      .listen(config.port);

    console.log(`Http Server started on port ${config.port}...`);

    return server;
  }
};