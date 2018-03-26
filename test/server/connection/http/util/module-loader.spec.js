const { expect } = require('chai');

const ModuleLoader = require('../../../../../server/connection/http/util/context/internal/module-loader');
const MockController = require('../mock/mock.controller');

describe('ModuleLoader', () => {

  it('should load class from given folder', () => {
    // given
    const config = { dir: 'test/server', pattern: '**/*.controller.js' };
    
    // when
    const classes = ModuleLoader.load(config);

    // then
    expect(classes).to.have.lengthOf(1);
    expect(classes[0]).to.equal(MockController);
  });

  it('should return empty array if pattern does not match any file', () => {
    // given
    const config = { dir: 'test/server', pattern: '**/*.nope.js' };
    
    // when
    const classes = ModuleLoader.load(config);

    // then
    expect(classes).to.be.empty;
  });

});
