const WORLDS = {
  1: { name: 'Watopia', lat: [348.3551, 11050000, 1], lng: [166.9529, 10840000, 1] },
  2: { name: 'Richmond', lat: [37.54303, 11080000, 1], lng: [282.56252, 8790000, 1] },
  3: { name: 'London', lat: [359.8321, 6940000, 1], lng: [51.5017, 11120000, -1] }
};

function mapToGeo(x, y, worldId) {
  const { lat, lng } = WORLDS[worldId];
  const transform = (v, consts) => consts[2] * ((v / consts[0]) + consts[1]);

  return [transform(x, lat), transform(y, lng)];
}


module.exports = function(zwiftStatus) {
  const [lat, lng] = mapToGeo(zwiftStatus.x, zwiftStatus.y, zwiftStatus.world);

  return {
    lat,
    lng,
    speed: zwiftStatus.speed,
    power: zwiftStatus.power,
    heartrate: zwiftStatus.heartrate,
    climbing: zwiftStatus.climbing,
    cadence: zwiftStatus.cadenceUHz,
    time: zwiftStatus.time
  };
};
