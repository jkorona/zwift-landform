const { HttpController, Endpoint } = require('../../../../../server/connection/http');

@HttpController
class MockController {

  @Endpoint(/^\/routes$/)
  routes() {
    
  }

  @Endpoint(/^\/routes\/(\w+)\/(\d+)$/)
  route(id, number) {

  }

}

module.exports = MockController;
