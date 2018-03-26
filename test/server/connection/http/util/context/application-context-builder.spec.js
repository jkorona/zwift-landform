const { expect } = require('chai');

const {
  Context,
  ApplicationContextBuilder,
  Injector,
  nodeModulesConfigurator
} = require('../../../../../../server/context');

describe('ApplicationContextBuilder', () => {

  it('should produce instance of Context', () => {
    // when
    const ctx = ApplicationContextBuilder.create().build();

    // then
    expect(ctx).to.be.instanceOf(Context);
  });

  it('should include context and injector global instances', () => {
    // when
    const ctx = ApplicationContextBuilder.create().build();

    // then
    expect(ctx.locate('context')).to.be.instanceOf(Context);
    expect(ctx.locate('injector')).to.be.instanceOf(Injector);

    expect(ctx.locate('context')).to.equal(ctx);
  });

  it('should allow including node std library', () => {
    // when
    const ctx = ApplicationContextBuilder
      .create()
      .configurator(nodeModulesConfigurator)
      .build();

    // then
    expect(ctx.locate('path')).to.be.ok;
    expect(ctx.locate('fs')).to.be.ok;
    expect(ctx.locate('http')).to.be.ok;
  });

});
