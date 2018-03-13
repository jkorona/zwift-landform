const { classAnnotation } = require('./annotation');

function readConstructorParams(constructor) {
  const REG_EXP = /\((.+)\)/;
  let result = [];

  const match = REG_EXP.exec(constructor.toString());
  if (match) {
    result = match[1].split(/\s*,\s*/);
  }

  return result;
}

module.exports = classAnnotation(function (...args) {
  if (!args.length) {
    args = readConstructorParams(this.class);
  }

  this.class.$$inject = args;
});
