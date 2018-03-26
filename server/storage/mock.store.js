const { Component } = require('../context/decorators');

@Component({ id: 'store' })
class MockStore {

  init() {
    return Promise.resolve();
  }

  routes() {
    return Promise.resolve([
      { stravaId: '12136784', label: 'Flat Route', worldId: 0, worldLabel: 'Watopia' },
      { stravaId: '12118362', label: 'Hilly Route', worldId: 0, worldLabel: 'Watopia' },
      { stravaId: '12483517', label: 'Mountain Route', worldId: 0, worldLabel: 'Watopia' },
      { stravaId: '12749761', label: 'Classique', worldId: 1, worldLabel: 'London' },
      { stravaId: '12128718', label: '2015 UCI Worlds Course', worldId: 2, worldLabel: 'Richmond' }
    ]);
  }

  route(param) {
    return new Promise((resolveFn, rejectFn) => {
      if (typeof param === 'string') { // query
        rejectFn();
      } else { // insert
        resolveFn(param);
      }
    });
  }

}

module.exports = MockStore;
