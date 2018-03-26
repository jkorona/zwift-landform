const path = require('path');
const glob = require('glob');

const DEFAULT_CONFIG = {
  dir: '/src',
  cwd: process.cwd(),
  pattern: '**/*.js'
};

class ModuleLoader {

  static load(config) {
    const { cwd, pattern, dir } = { ...DEFAULT_CONFIG, ...config };

    const files = glob.sync(path.join(dir, pattern), { cwd });
    return files.map((fileName) => require(path.join(cwd, fileName)));
  }

}

module.exports = ModuleLoader;
