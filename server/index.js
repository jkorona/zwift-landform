const applicationContext = require('./app-config');
const ZwiftIntegration = require('./integration/zwift.integration');


const httpServer = applicationContext.locate('HttpServer');
const dataSource = applicationContext.locate('dataSource');

const app = httpServer.start([
  { pattern: /^\/routes$/, handler: () => dataSource.getAllRoutes() },
  { pattern: /^\/routes\/(\d+)$/, handler: (routeId) => dataSource.getRoute(routeId) }
]);

// const ws = wsServer.start(app, (socketWrapper) => ZwiftIntegration.instance.track(socketWrapper));