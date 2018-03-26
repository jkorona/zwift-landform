const { expect } = require('chai');
const { get, hasAnnotation } = require('../../../../../../server/context/utils');

describe('utils', () => {

  describe('.get()', () => {

    it('should be able to access nested property by string path', () => {
      // given
      const obj = { p1: { p2: [{ p3: [42] }] } };

      // when
      const result = get(obj, 'p1.p2[0].p3[0]');

      // then
      expect(result).to.equal(42);
    });

    it('should be able to access nested property by array path', () => {
      // given
      const obj = { p1: { p2: [{ p3: [42] }] } };

      // when
      const result = get(obj, 'p1', 'p2', 0, 'p3', 0);

      // then
      expect(result).to.equal(42);
    });

    it('should return undefined if one chain link is empty', () => {
      // given
      const obj = { p1: { p2: [{ p3: [42] }] } };

      // when
      const result = get(obj, 'p1', 'p2', 1, 'p3', 0);

      // then
      expect(result).to.be.undefined;
    });

  });

  describe('hasAnnotation()', () => {

    class Parent { }
    Parent.annotationA = {};

    class Child extends Parent { }
    Child.annotationB = {}

    it('should return true if given type has own annotation', () => {
      expect(hasAnnotation(Child, 'annotationB')).to.be.true;
    });

    it('should return true if any of the parent types has annotation', () => {
      expect(hasAnnotation(Child, 'annotationA')).to.be.true;
    });

    it('should return false if any type in protypes chain do not have annotation', () => {
      expect(hasAnnotation(Child, 'annotationC')).to.be.false;
    });

  });



});
