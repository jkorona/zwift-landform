const { expect } = require('chai');

const Inject = require('../../../../../../../server/context/decorators/inject');

describe('Inject annotation', () => {

  it('should add metadata information read from constructor automatically', () => {
    // when
    @Inject()
    class T {
      constructor(foo, bar, baz) { }
    }

    // then
    expect(T.$$inject).to.eql(['foo', 'bar', 'baz']);
  });

  it('should add metadata information read from annotation parameters', () => {
    // when
    @Inject('foo', 'bar', 'baz')
    class T { }

    // then
    expect(T.$$inject).to.eql(['foo', 'bar', 'baz']);
  });

});
