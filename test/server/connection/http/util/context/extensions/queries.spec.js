const { expect } = require('chai');

const { Context, classAnnotation, queries } = require('../../../../../../../server/context');

describe('queries', () => {

  const Annotation = classAnnotation('Annotation', () => 0);

  @Annotation()
  class A { }
  class B { }
  class C { }

  let ctx;

  before(() => {
    ctx = new Context();
    ctx.register().byClass(A);
    ctx.register().bindTo(A).byClass(B);
    ctx.register().byClass(C);
  });


  describe('.isBoundTo(type)', () => {

    it('should find beans bound to given class', () => {
      // when
      const result = ctx.find(queries.isBoundTo(A));

      // then
      expect(result).to.have.lengthOf(2);

      expect(result[0]).to.be.instanceOf(A);
      expect(result[1]).to.be.instanceOf(B);
    });

  });

  describe('.isAnnotated(annotation)', () => {

    it('should find annotated beans by annotation name', () => {
      // when
      const result = ctx.find(queries.isAnnotated('Annotation'));

      // then
      expect(result).to.have.lengthOf(2);

      expect(result[0]).to.be.instanceOf(A);
      expect(result[1]).to.be.instanceOf(B);
    });

    it('should find annotated beans by annotation function', () => {
      // when
      const result = ctx.find(queries.isAnnotated(Annotation));

      // then
      expect(result).to.have.lengthOf(2);

      expect(result[0]).to.be.instanceOf(A);
      expect(result[1]).to.be.instanceOf(B);
    });

  });

});

