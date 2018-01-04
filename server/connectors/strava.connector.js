const axios = require('axios');
const assert = require('assert');

function configure() {
  const ERROR_MESSAGE = 'Missing environment variable: STRAVA_ACCESS_TOKEN. Please provide it.';

  assert(process.env.STRAVA_ACCESS_TOKEN, ERROR_MESSAGE);

  return {
    accessToken: process.env.STRAVA_ACCESS_TOKEN,
    host: 'https://www.strava.com/api',
    version: 3,
    resourceName: 'segments'
  }
}

const config = configure();

module.exports = {
  loadSegment(id) {
    const url = `${config.host}/v${config.version}/${config.resourceName}/${id}/streams/altitude`;
    const headers = {
      Authorization: `Bearer ${config.accessToken}`
    };

    return axios.get(url, { headers }).then(({ data }) => data);
  }
}
