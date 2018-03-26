const { HttpController, Endpoint } = require('../connection/http');

@HttpController
class RestController {

  controller(dataSource) {
    this.dataSource = dataSource;
  }

  @Endpoint(/^\/routes$/)
  getAllRoutes() {
    return this.dataSource.getAllRoutes();
  }

  @Endpoint(/^\/routes\/(\d+)$/)
  getRoute(routeId) {
    return this.dataSource.getRoute(routeId);
  }

}

module.exports = RestController;
