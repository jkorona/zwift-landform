const { expect } = require('chai');

const stravaSegmentParser = require('../../../../server/parsers/strava-segment.parser');

describe('stravaSegmentParser', () => {

  it('should properly parse whole streams into milestone objects', () => {
    // given
    const stravaStream = require('./fixtures/strava-segment-stream');

    // when
    const result = stravaSegmentParser(stravaStream);

    // then
    expect(result).to.deep.equal([
      { latlng: [38.603734, -122.864112], distance: 0, altitude: 10 },
      { latlng: [38.608798, -122.867714], distance: 1, altitude: 11 },
      { latlng: [38.604691, -122.88178], distance: 2, altitude: 12 }
    ])
  });

});
