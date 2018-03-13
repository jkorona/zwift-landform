const { expect } = require('chai');
const { spy } = require('sinon');
const { Context } = require('../../../../../../server/connection/http/util/context');

describe('Context', () => {

  let ctx;

  class BasicClass { }
  class ComplexClass {
    constructor(basic) {
      this.basic = basic;
    }
  }

  beforeEach(() => {
    ctx = new Context();
  });

  it('should register by class', () => {
    // when
    ctx.register().byClass(BasicClass);

    // then
    expect(ctx.locate('BasicClass')).to.be.instanceof(BasicClass);
  });

  it('should register by factory', () => {
    // given
    const factory = () => new BasicClass()

    // when
    ctx.register().withId('BasicClass').byFactory(factory);

    // then
    expect(ctx.locate('BasicClass')).to.be.instanceof(BasicClass);
  });

  it('should require explicit id when registered by factory', () => {
    // given
    const factory = () => new BasicClass()
    const action = () => ctx.register().byFactory(factory);

    // when => then
    expect(action).to.throw(Error);
  });

  it('should register by instance', () => {
    // given
    const instance = new BasicClass()

    // when
    ctx.register().byInstance(instance);

    // then
    expect(ctx.locate('BasicClass')).to.be.instanceof(BasicClass);
    expect(ctx.locate('BasicClass')).to.equal(instance);
  });


  it('should use prototype bean scope if required', () => {
    // when
    ctx.register().asPrototype().byClass(BasicClass);

    // then
    expect(ctx.locate('BasicClass')).to.not.equal(ctx.locate('BasicClass'));
  });

  it('should throw if bean not available', () => {
    // given
    const action = () => ctx.locate('BasicClass');

    // when => then
    expect(action).to.throw(Error);
  });

  it('should locate all beans', () => {
    // given
    ctx.register().byClass(BasicClass);
    ctx.register().byClass(ComplexClass);

    // when
    const beans = ctx.locateAll('BasicClass', 'ComplexClass');

    // then
    expect(beans).to.have.lengthOf(2);
    expect(beans[0]).to.be.instanceof(BasicClass);
    expect(beans[1]).to.be.instanceof(ComplexClass);
  });

  it('should resolve dependencies', () => {
    // given
    ctx.register().byClass(BasicClass);
    ctx.register().byClass(ComplexClass, 'BasicClass');

    // when
    const bean = ctx.locate('ComplexClass');

    // then
    expect(bean.basic).to.be.ok;
    expect(bean.basic).to.be.instanceOf(BasicClass);
  });

  it('should detect cyclic dependency', () => {
    // given
    ctx.register().byClass(BasicClass, 'ComplexClass');
    ctx.register().byClass(ComplexClass, 'BasicClass');

    // when => then
    expect(() => ctx.locate('ComplexClass')).to.throw('A cyclic dependency detected in bean ComplexClass');
  });

  it('should disallow registering prototype beans by class instance', () => {
    // given
    const instance = new BasicClass();
    const action = () => ctx.register().asPrototype().byInstance(instance);

    // when => then
    expect(action).to.throw('You cannot use prototype scope with instance.');
  });

  it('should immediately initialize eager beans', () => {
    // given
    const spyFn = spy();
    class DummyClass {
      constructor() { spyFn() };
    }
    ctx.register().isEager().byClass(DummyClass);

    // when
    ctx.bootstrap();

    // then
    expect(spyFn.calledOnce).to.be.true;
  });

  it('should throw if prototype registered as eager', () => {
    // given
    const action = () => ctx.register()
      .asPrototype()
      .isEager()
      .byClass(BasicClass);

    // when => then
    expect(action).to.throw('Only singletons can be eager.');
  });
});
