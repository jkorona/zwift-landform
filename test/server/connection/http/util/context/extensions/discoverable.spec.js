const { expect } = require('chai');

const { Context } = require('../../../../../../../server/context');
const Discoverable = require('../../../../../../../server/context/extensions/discoverable');

const SimpleBean = require('./test-data/simple-bean');

describe('DiscoverableContext', () => {

  const CONFIG = {
    dir: 'test/server/connection/http/util/context/extensions/test-data',
    pattern: '**/*.js'
  }
  const ctx = new Context();
  const dCtx = Discoverable.create(ctx, CONFIG);

  before(() => {
    dCtx.bootstrap();
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
    const cb = dCtx.locate('ComplexBean');

    // then
    expect(cb.simple).to.be.instanceOf(SimpleBean);
  });

});
