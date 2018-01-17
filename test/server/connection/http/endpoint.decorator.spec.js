const { expect } = require('chai');
const MockController = require('./mock/mock.controller');

describe('@Endpoint', () => {

  const mock = new MockController();

  it('should set static function `matches` on method', () => {
    expect(mock.routes.$$matches).to.be.ok;
  });

  it('should `match` function evaluate uris according to pattern', () => {
    // given
    const correctUri = '/routes';
    const wrongUri1 = '/blah';
    const wrongUri2 = '/routes/blah';

    // when => then
    expect(mock.routes.$$matches(correctUri).result).to.be.true;
    expect(mock.routes.$$matches(wrongUri1).result).to.be.false;
    expect(mock.routes.$$matches(wrongUri2).result).to.be.false;
  });

  it('should parse arguments from uri according to pattern', () => {
    // given
    const uri = '/routes/foo/123'

    // when => then
    expect(mock.route.$$matches(uri).args).to.eql(['foo', '123']);
  });

  it('should register method in the static `$$endpoints` class property', () => {
    expect(mock.$$endpoints).to.be.ok;
    expect(mock.$$endpoints).to.have.lengthOf(2);
    expect(mock.$$endpoints).to.eql([
      mock.routes,
      mock.route
    ]);
  });

});
