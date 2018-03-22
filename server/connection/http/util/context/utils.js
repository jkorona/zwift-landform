function get(object, ...paths) {
  const REG_EXP = /([^.\[\]]+)/g;
  const parts = paths.join('.').match(REG_EXP);

  let value = object;
  while (value && parts.length) {
    value = value[parts.shift()];
  }

  return value;
};

function hasAnnotation(type, annotation) {
  if (!type) return false;
  if (!!type[annotation]) return true;
  return hasAnnotation(type.prototype, annotation);
};

module.exports = { get, hasAnnotation };
