const http = require('http');
const fs = require('fs');

const DEFAULT_CONFIG = {
  port: 3000
};

module.exports = {
  start(config = {}) {
    config = Object.assign({}, DEFAULT_CONFIG, config);

    const server = http.createServer((request, response) => {
      console.log(`Retrieved request to url ${request.url}...`);
      switch (request.url) {
        case '/routes':
          response.writeHead('200', { 'Content-Type': 'application/json' })
          response.write(JSON.stringify([ 
            { id: '001', label: 'Foo' },
            { id: '002', label: 'Bar' },
           ]));
           response.end();
          break;
        case '/':
          fs.readFile('client/index.html', function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
          });
          break;
        // default:
        //   response.writeHead(301, { 'Content-Type': 'text/html', 'Location': '/' });
        //   response.end();
      }
    }).listen(config.port);

    console.log(`Http Server started on port ${config.port}...`);

    return server;
  }
};