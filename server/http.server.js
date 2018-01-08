class HttpServer {

  static get DEFAULT_CONFIG() {
    return {
      port: 3000,
      indexPath: 'client/index.html'
    };
  };

  constructor(http, fs) {
    this.http = http;
    this.fs = fs;
  }

  start(resourceHandlers = {}, config = {}) {
    this.config = Object.assign({}, HttpServer.DEFAULT_CONFIG, config);

    const server = this.http
      .createServer(this.createHttpHandler(resourceHandlers))
      .listen(this.config.port);

    return server;
  }

  createHttpHandler(resourceHandlers) {
    return (request, response) => {
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
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.write(JSON.stringify(data));
        response.end();
      });
  }

  redirectToIndex(response) {
    response.writeHead(301, { 'Content-Type': 'text/html', 'Location': '/' });
    response.end();
  }

  sendIndexHtml(response) {
    this.fs.readFile(this.config.indexPath, function (err, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  }

}

module.exports = HttpServer;