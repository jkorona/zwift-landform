const { expect } = require('chai');
const { spy } = require('sinon');
const { contextConfigurator, Context } = require('../../../../../../server/connection/http/util/context');

describe('contextConfigurator', () => {

  let ctx;

  beforeEach(() => {
    ctx = new Context();
  });

  it('should produce function', () => {
    // when
    const configurator = contextConfigurator(() => 0);

    // then
    expect(configurator).to.be.instanceOf(Function);
  });

  it('should expose api to register beans in provided context', () => {
    // given
    const obj = { magicNumber: 42 };
    const configurator = contextConfigurator(function () {
      this.register().withId('obj').byInstance(obj);
    });

    // when
    configurator(ctx);

    // then
    expect(ctx.locate('obj')).to.equal(obj);
  });

});
