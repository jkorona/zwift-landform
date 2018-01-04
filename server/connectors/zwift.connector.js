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

checkEnvironment();

const user = {
  name: process.env.ZWIFT_USER,
  password: decodeBase64(process.env.ZWIFT_PASSWORD)
};

const account = new ZwiftAccount(user.name, user.password);

// account.getProfile().profile().then(p => {
//   console.log(p);
// });

// account.getWorld(1).riders()
//   .then((riders) => console.log(riders.friendsInWorld[0]), (e) => console.log('error', e))
