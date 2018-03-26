const { expect } = require('chai');
const { stub, spy } = require('sinon');

const { Injector } = require('../../../../../../../server/context');

describe('Injector', () => {

  const ctxMock = {
    locateAll: stub().callsFake((...value) => value)
  }
  const injector = new Injector(ctxMock);

  describe('.invoke()', () => {

    it('should call function with given dependencies', () => {
      // given
      const fn = spy();

      // when
      injector.invoke(fn, ['foo', 'bar', 'baz']);

      // then
      expect(fn.calledOnce).to.be.true;
      expect(fn.lastCall.args).to.eql(['foo', 'bar', 'baz']);
    });

    it('should include local parameters', () => {
      // given
      const fn = spy();

      // when
      injector.invoke(fn, ['foo', 'bar'], ['baz']);

      // then
      expect(fn.calledOnce).to.be.true;
      expect(fn.lastCall.args).to.eql(['foo', 'bar', 'baz']);
    });

    it('should return value', () => {
      // given
      const fn = stub().returns(42);

      // when
      const result = injector.invoke(fn);

      // then
      expect(result).to.equal(42);
    });

  });

  describe('.instantiate()', () => {

    it('should return class instance', () => {
      // given
      class DummyClass { };

      // when
      const instance = injector.instantiate(DummyClass);

      // then
      expect(instance).to.be.instanceOf(DummyClass);
    });

    it('should instantiate with given dependencies in constructor params', () => {
      // given
      class DummyClass {
        constructor(foo, bar) {
          expect(foo).to.equal('foo');
          expect(bar).to.equal('bar');
        }
      };

      // when
      const instance = injector.instantiate(DummyClass, ['foo', 'bar']);

      // then
      expect(instance).to.be.instanceOf(DummyClass);
    });

    it('should include local parameters', () => {
      // given
      class DummyClass {
        constructor(foo, bar) {
          expect(foo).to.equal('foo');
          expect(bar).to.equal('bar');
        }
      };

      // when
      const instance = injector.instantiate(DummyClass, ['foo'], ['bar']);

      // then
      expect(instance).to.be.instanceOf(DummyClass);
    });

  });

});
