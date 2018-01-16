const WORLDS = {
  1: {
    name: 'Watopia',
    fn: (x, y) => [
      (x / 11050000) + 348.3551,
      (y / 10840000) + 166.9529
    ]
  },
  2: {
    name: 'Richmond',
    fn: (x, y) => [
      (x / 11080000) + 37.54303,
      (y / 8790000) + 282.56252
    ]
  },
  3: {
    name: 'London',
    fn: (x, y) => [
      51.5017 - (y / 11120000),
      ((x / 6940000) + 359.8321) - 360
    ]
  }
};

function mapToGeo(x, y, worldId = 3) {
  const { fn } = WORLDS[worldId];
  return fn(x, y);
}


module.exports = function (zwiftStatus) {
  const [lat, lng] = mapToGeo(zwiftStatus.x, zwiftStatus.y, zwiftStatus.world);

  return {
    lat,
    lng,
    speed: zwiftStatus.speed,
    power: zwiftStatus.power,
    heartrate: zwiftStatus.heartrate,
    climbing: zwiftStatus.climbing,
    cadence: zwiftStatus.cadence,
    time: zwiftStatus.time,
    distance: zwiftStatus.distance
  };
};
