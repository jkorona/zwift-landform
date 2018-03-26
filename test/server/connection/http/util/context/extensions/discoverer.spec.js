const { expect } = require('chai');

const { Context } = require('../../../../../../../server/context');
const Discoverer = require('../../../../../../../server/context/extensions/discoverer');

const SimpleBean = require('./test-data/simple-bean');

describe('Discoverer', () => {

  const CONFIG = {
    dir: 'test/server/connection/http/util/context/extensions/test-data',
    pattern: '**/*.js'
  };
  const ctx = new Context();
  const discoverer = Discoverer.create(ctx);

  before(() => {
    discoverer.search(CONFIG);
  });

  it('should find two beans', () => {
    expect(Object.keys(ctx.beans)).to.have.lengthOf(2);
    expect(Object.keys(ctx.beans)).to.eql([
      'ComplexBean',
      'simple'
    ]);
  });

  it('should inject dependencies', () => {
    // when
    const cb = ctx.locate('ComplexBean');

    // then
    expect(cb.simple).to.be.instanceOf(SimpleBean);
  });

});
