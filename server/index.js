const applicationContext = require('./app-config');
const ZwiftIntegration = require('./integration/zwift.integration');

// REST

const httpServer = applicationContext.locate('HttpServer');
const dataSource = applicationContext.locate('dataSource');

const app = httpServer.start([
  { pattern: /^\/routes$/, handler: () => dataSource.getAllRoutes() },
  { pattern: /^\/routes\/(\d+)$/, handler: (routeId) => dataSource.getRoute(routeId) }
]);

// WEB SOCKET

const wsServer = applicationContext.locate('WebSocketServer');
const zwiftIntegration = applicationContext.locate('ZwiftIntegration');

const ws = wsServer.start(app, (socketWrapper) => zwiftIntegration.track(socketWrapper));