const http = require('http');
const fs = require('fs');

const HttpServer = require('./http.server');
const WebSocketServer = require('./ws.server');

const DataSource = require('./storage/data-source');
const MockStorage = require('./storage/mock.store');

const dataSource = new DataSource(new MockStorage());

module.exports = {
  boot() {
    const httpServer = new HttpServer(http, fs);
    const wsServer = new WebSocketServer();

    const app = httpServer.start([
      { pattern: /^\/routes$/, handler: () => dataSource.getAllRoutes() },
      { pattern: /^\/routes\/(\d+)$/, handler: (routeId) => dataSource.getRoute(routeId) }
    ]);

    const ws = wsServer.start(app);
  }
}
