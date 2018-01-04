class MockStore {

  init() {
    return Promise.resolve();
  }

  routes() {
    return Promise.resolve([
      { stravaId: '12136784', label: 'Flat Route', worldId: 0, worldLabel: 'Watopia' },
      { stravaId: '12118362', label: 'Hilly Route', worldId: 0, worldLabel: 'Watopia' },
      { stravaId: '12483517', label: 'Mountain Route', worldId: 0, worldLabel: 'Watopia' }
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
