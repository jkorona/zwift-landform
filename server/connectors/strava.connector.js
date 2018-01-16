const axios = require('axios');
const assert = require('assert');

const stravaSegmentParser = require('./parsers/strava-segment.parser');

class StravaConnector {

  static configure() {
    const ERROR_MESSAGE = 'Missing environment variable: STRAVA_ACCESS_TOKEN. Please provide it.';

    assert(process.env.STRAVA_ACCESS_TOKEN, ERROR_MESSAGE);

    return {
      accessToken: process.env.STRAVA_ACCESS_TOKEN,
      host: 'https://www.strava.com/api',
      version: 3,
      resourceName: 'segments'
    }
  }

  constructor() {
    this.config = StravaConnector.configure();
  }

  loadSegment(id) {
    const { host, version, resourceName, accessToken } = this.config;
    const url = `${host}/v${version}/${resourceName}/${id}/streams`;
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    return axios.get(url, { headers }).then(({ data }) => stravaSegmentParser(data));
  }

}

module.exports = new StravaConnector();
