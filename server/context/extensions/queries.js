const { hasAnnotation } = require('../utils');

function isAnnotated(annotation) {
  return ({ type }) => hasAnnotation(type, annotation);
}

function isBoundTo(expectedType) {
  return ({ type }) => type === expectedType;
}

module.exports = {
  isAnnotated,
  isBoundTo
}
