const assert = require('assert');
const ZwiftAccount = require("zwift-mobile-api");

function checkEnvironment() {
  const ERROR_MESSAGE = 'Missing environment variables: ZWIFT_USER, ZWIFT_PASSWORD. Please provide them.';

  assert(process.env.ZWIFT_USER, ERROR_MESSAGE);
  assert(process.env.ZWIFT_PASSWORD, ERROR_MESSAGE);
}

function decodeBase64(code) {
  return Buffer.from(code, 'base64').toString('ascii');
}

const WORLDS = [
  { lat: [348.3551, 11050000, 1], lng: [166.9529, 10840000, 1] },
  { lat: [37.54303, 11080000, 1], lng: [282.56252, 8790000, 1] },
  { lat: [359.8321, 6940000, 1], lng: [51.5017, 11120000, -1] }
];

function mapToGeo(x, y, worldId) {
  const { lat, lng } = WORDLDS[worldId];
  const transform = (v, consts) => consts[2] * ((v / consts[0]) + consts[1]);

  return [transform(x, lat), transform(y, lng)];
}

checkEnvironment();

const user = {
  name: process.env.ZWIFT_USER,
  password: decodeBase64(process.env.ZWIFT_PASSWORD)
};

const account = new ZwiftAccount(user.name, user.password);

account.getProfile().profile()
  .then(({ id }) => account.getWorld(1).riderStatus(id))
  .then((status) => console.log(status));


// account.getWorld(1).riders()
//   .then((riders) => console.log(riders.friendsInWorld[0]), (e) => console.log('error', e))
