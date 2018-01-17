const { expect, assert } = require('chai');
const { stub } = require('sinon');

const MockController = require('./mock/mock.controller');

describe('@HttpController', () => {

  const mock = new MockController();

  it('should expose $$handle method', () => {
    expect(mock.$$handles).to.be.ok;
    expect(mock.$$handles).to.have.instanceOf(Function);
  });

  it('should handle request with handlers', () => {
    // given
    stub(mock, 'route');
    
    // when
    const success = mock.$$handles('/routes/foo/123');
    const failure = mock.$$handles('/foobar');

    // then
    expect(success).to.be.true;
    expect(failure).to.be.false;

    assert(mock.route.withArgs('foo', '123').calledOnce);

    mock.route.restore();
  });

});
