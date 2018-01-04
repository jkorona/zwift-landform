const stravaConnector = require('../connectors/strava.connector');
const stravaSegmentParser = require('./parsers/strava-segment.parser');

class DataStore {

  constructor(store) {
    this.store = store;
  }

  whenStoreInitialized() {
    return this.store.init();
  }

  getAllRoutes() {
    return this.whenStoreInitialized()
      .then(() => this.store.routes());
  }

  getRoute(id) {
    return this.whenStoreInitialized()
      .then(() => this.store.route(id))
      .catch(() => this.loadStravaSegment(id));
  }

  loadStravaSegment(id) {
    return stravaConnector
      .loadSegment(id)
      .then((stravaSegment) => stravaSegmentParser(stravaSegment))
      .then((route) => this.store.route(route));
  }

}

module.exports = DataStore;
