class HttpServer {

  static get DEFAULT_CONFIG() {
    return {
      port: 3000
    };
  };

  constructor(http, fs) {
    this.http = http;
    this.fs = fs;
  }

  start(resourceHandlers = {}, config = {}) {
    config = Object.assign({}, HttpServer.DEFAULT_CONFIG, config);

    const server = this.http
      .createServer(this.createHttpHandler(resourceHandlers))
      .listen(config.port);

    console.log(`Http Server started on port ${config.port}...`);

    return server;
  }

  createHttpHandler(resourceHandlers) {
    return (request, response) => {
      console.log(`Retrieved request to url ${request.url}...`);

      const resourceName = request.url.substr(1);

      if (resourceName) {
        if (resourceHandlers.hasOwnProperty(resourceName)) {
          this.callApi(resourceHandlers[resourceName], response);
        } else {
          this.redirectToIndex(response);
        }
      } else {
        this.sendIndexHtml(response);
      }
    };
  }

  callApi(handler, response) {
    Promise.resolve(handler())
      .then((data) => {
        response.writeHead('200', { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(data));
        response.end();
      });
  }

  redirectToIndex(response) {
    response.writeHead(301, { 'Content-Type': 'text/html', 'Location': '/' });
    response.end();
  }

  sendIndexHtml(response) {
    this.fs.readFile('client/index.html', function (err, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  }

}

module.exports = HttpServer;