const assert = require('assert');
const ZwiftAccount = require('zwift-mobile-api');
const riderStatusParser = require('./parsers/zwift-rider-status.parser');

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

let zwiftConnector;
class ZwiftConnector {

  static get instance() {
    if (!zwiftConnector) {
      zwiftConnector = new ZwiftConnector();
    }
    return zwiftConnector;
  }

  constructor() {
    const account = new ZwiftAccount(user.name, user.password);

    this.account = account;
    this.profilePromise = account.getProfile().profile();
  }

  track(socket) {
    const id = setInterval(() => {
      this.profilePromise
        .then(({ id }) => this.account.getWorld(1).riderStatus(id))
        .then((status) => {
          socket.send('riderStatus', riderStatusParser(status))
        })
        .catch((err) => {
          if (err.response) {
            socket.send('riderDisconnected', err.response.status);
          } else {
            console.log(err);
          }
        });

    }, 2000);

    socket.whenDisconnected(() => clearInterval(id));
  }

}

module.exports = ZwiftConnector;
