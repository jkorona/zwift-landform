const { expect } = require('chai');

const {
  ApplicationContextBuilder,
  Context,
  Injector
} = require('../../../../../../server/connection/http/util/context');



describe('ApplicationContextBuilder', () => {

  it('should include context and injector global instances', () => {
    // given

    // when
    const ctx = ApplicationContextBuilder.create().build();

    // then
    expect(ctx.locate('context')).to.be.instanceOf(Context);
    expect(ctx.locate('injector')).to.be.instanceOf(Injector);

    expect(ctx.locate('context')).to.equal(ctx);
  });

});
