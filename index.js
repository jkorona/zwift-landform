const httpServer = require('./server/http.server');

const DataSource = require('./server/storage/data-source');
const MockStorage = require('./server/storage/mock.store');

// httpServer.start();

const dataSource = new DataSource(new MockStorage());

dataSource.getRoute('12136784')
  .then((route) => {
    console.log(route);
  })
  .catch((error) => {
    console.log(error);
  });

