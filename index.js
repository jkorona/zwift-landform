const httpServer = require('./server/http.server');
const stravaConnector = require('./server/connectors/strava.connector');

// httpServer.start();

stravaConnector.loadSegment('12136784').then((segment) => {
  console.log(segment);
})
.catch((error) => {
  console.log(error);
});
