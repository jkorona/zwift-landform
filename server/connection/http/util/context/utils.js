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

  const name = typeof (annotation) === 'string' ? annotation : annotation.annotationName;
  if (!!type[name]) return true;

  return hasAnnotation(type.prototype, annotation);
};

module.exports = { get, hasAnnotation };
