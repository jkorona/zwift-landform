const http = require('http');
const fs = require('fs');

const HttpServer = require('./http.server');

const DataSource = require('./storage/data-source');
const MockStorage = require('./storage/mock.store');

const dataSource = new DataSource(new MockStorage());

module.exports = {
  boot() {
    const httpServer = new HttpServer(http, fs);

    httpServer.start({
      route() {
        return dataSource.getRoute('12136784')
      },
      routes() {
        return dataSource.getAllRoutes();
      }
    });
  }
}
