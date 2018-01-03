const http = require('http');
const fs = require('fs');

const DEFAULT_CONFIG = {
  port: 3000
};

module.exports = {
  start(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config);

    const server = http.createServer((request, response) => {
      fs.readFile('client/index.html', function (err, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
      });
    }).listen(config.port);

    console.log(`Http Server started on port ${config.port}...`);

    return server;
  }
};