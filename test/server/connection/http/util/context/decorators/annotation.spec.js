const { expect } = require('chai');
const { spy } = require('sinon');

import { classAnnotation } from '../../../../../../../server/connection/http/util/context/decorators/annotation';

describe('annotation', () => {

  describe('classAnnotation', () => {

    it('should execute simple annotation on class', () => {
      // given
      const fn = spy();
      const Simple = classAnnotation(fn);

      // when
      @Simple('foo', 'bar')
      class T { };

      // then
      expect(fn.calledOnce).to.be.true;
      expect(fn.lastCall.args).to.eql(['foo', 'bar']);
      expect(fn.lastCall.thisValue).to.eql({ class: T, prototype: T.prototype });
    });

    it('should execute complex annotation on class', () => {
      // given
      const fn1 = spy();
      const fn2 = spy();

      const Simple = classAnnotation(fn1);
      const Complex = classAnnotation(fn2).extends(Simple('foo'));

      // when
      @Complex('bar')
      class T { };

      // then
      expect(fn1.calledOnce).to.be.true;
      expect(fn1.lastCall.args).to.eql(['foo']);
      expect(fn1.lastCall.thisValue).to.eql({ class: T, prototype: T.prototype });

      expect(fn2.calledOnce).to.be.true;
      expect(fn2.lastCall.args).to.eql(['bar']);
      expect(fn2.lastCall.thisValue).to.eql({ class: T, prototype: T.prototype });

      expect(fn1.calledBefore(fn2)).to.be.true;
    });

    it('should store metadata on class if name provided and value returned', () => {
      // given
      const Annotation = classAnnotation(function annotation() {
        return {
          senseOfLife: 42
        };
      });

      // when
      @Annotation()
      class T {}

      // then
      expect(T.$$annotation).to.eql({
        senseOfLife: 42
      });
    });

  });

});
