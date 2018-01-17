const { HttpController, Endpoint } = require('../../../../../server/connection/http');

@HttpController
class MockController {

  @Endpoint(/^\/routes$/g)
  routes() {
    
  }

  @Endpoint(/^\/routes\/(\w+)\/(\d+)$/g)
  route(id, number) {

  }

}

module.exports = MockController;
