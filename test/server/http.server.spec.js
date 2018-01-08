const { expect, assert } = require('chai');
const sinon = require('sinon');

const HttpServer = require('../../server/http.server');

describe('HttpServer', () => {

  let httpServer;
  let httpMock;
  let fsMock;

  beforeEach(() => {
    httpMock = {
      createServer: sinon.stub().callsFake(() => httpMock),
      listen: sinon.spy()
    };
    fsMock = {
      readFile: sinon.stub()
    };

    httpServer = new HttpServer(httpMock, fsMock);
  });

  it('should instantiate http server', () => {
    // when
    httpServer.start();

    // then
    assert(httpMock.createServer.calledOnce);
    assert(httpMock.listen.calledWith(3000));
  });

  it('should override default server options with parameter', () => {
    // given
    const customOptions = {
      port: 44
    };

    // when
    httpServer.start({}, customOptions);

    // then
    assert(httpMock.listen.calledWith(44));
  });

  describe('http handler', () => {

    beforeEach(() => {
      fakeRequest = {};
      fakeResponse = {
        writeHead: sinon.spy(),
        write: sinon.spy(),
        end: sinon.spy()
      };

      httpServer.start();
    });

    it('should return index.html file for root requests', () => {
      // given
      const handler = httpServer.createHttpHandler({});

      fakeRequest.url = '/';
      fsMock.readFile.callsFake((path, callbackFn) => {
        expect(path).to.equal('client/index.html');
        callbackFn(null, 'index.html');
      })

      // when
      handler(fakeRequest, fakeResponse);

      // then
      assert(fakeResponse.writeHead
        .withArgs(200, { 'Content-Type': 'text/html' })
        .calledOnce
      );
      assert(fakeResponse.write.withArgs('index.html').calledOnce);
      assert(fakeResponse.end.calledOnce);
    });

    it('should call api when corresponding resource handler available', () => {
      // given
      const handler = httpServer.createHttpHandler({
        'routes': () => ['foo', 'bar']
      });
      fakeRequest.url = '/routes';

      // when
      handler(fakeRequest, fakeResponse);

      // then
      return Promise.resolve()
        .then(() => {
          assert(fakeResponse.writeHead
            .withArgs(200, { 'Content-Type': 'application/json' })
            .calledOnce
          );
          assert(fakeResponse.write
            .withArgs(JSON.stringify(['foo', 'bar']))
            .calledOnce
          );
          assert(fakeResponse.end.calledOnce);
        })
    });

    it('should redirect to root page if resource handler not available', () => {
      // given
      const handler = httpServer.createHttpHandler({});
      fakeRequest.url = '/foobar';
  
      // when
      handler(fakeRequest, fakeResponse);
  
      // then
      assert(fakeResponse.writeHead
        .withArgs(301, { 'Content-Type': 'text/html', 'Location': '/' })
        .calledOnce
      );
      assert(fakeResponse.end.calledOnce);
    });

  });

});
