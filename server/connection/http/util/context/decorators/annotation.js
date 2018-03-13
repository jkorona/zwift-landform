
function classAnnotation(fn) {
  function annotation(...params) {
    return (target) => {
      const ctx = { class: target, prototype: target.prototype };

      annotation.$$processors.forEach((processor) => processor(target));
      fn.apply(ctx, params);
    }
  }
  annotation.$$processors = [];
  annotation.extends = function (base) {
    annotation.$$processors.push(base);

    return annotation;
  }
  return annotation;
}

module.exports = {
  classAnnotation
}
