const { expect } = require('chai');

const Component = require('../../../../../../../server/connection/http/util/context/decorators/component');
const BeanScope = require('../../../../../../../server/connection/http/util/context/bean-scope');

describe('Component annotation', () => {

  it('should add metadata information to class with default configuration', () => {
    // when
    @Component()
    class T {}

    // then
    expect(T.$$component).to.be.ok;
    expect(T.$$component).to.eql({
      id: T.name,
      scope: BeanScope.SINGLETON,
      eager: false
    });
  });

  it('should add metadata information to class with custom configuration', () => {
    // when
    @Component({ id: 'foo', scope: BeanScope.PROTOYPE, eager: true })
    class T {}

    // then
    expect(T.$$component).to.be.ok;
    expect(T.$$component).to.eql({
      id: 'foo',
      scope: BeanScope.PROTOYPE,
      eager: true
    });
  });

});
