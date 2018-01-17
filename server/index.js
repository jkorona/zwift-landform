const http = require('http');
const fs = require('fs');
const sockets = require('socket.io');

const HttpServer = require('./http.server');
const WebSocketServer = require('./ws.server');

const DataSource = require('./storage/data-source');
const MockStorage = require('./storage/mock.store');

const ZwiftIntegration = require('./integration/zwift.integration');

const dataSource = new DataSource(new MockStorage());

const httpServer = new HttpServer(http, fs);
const wsServer = new WebSocketServer(sockets);

const app = httpServer.start([
  { pattern: /^\/routes$/, handler: () => dataSource.getAllRoutes() },
  { pattern: /^\/routes\/(\d+)$/, handler: (routeId) => dataSource.getRoute(routeId) }
]);

const ws = wsServer.start(app, (socketWrapper) => ZwiftIntegration.instance.track(socketWrapper));