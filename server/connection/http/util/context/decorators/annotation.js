
function classAnnotation(fn) {
  const name = fn.name;

  function annotation(...params) {
    return (target) => {
      const ctx = { class: target, prototype: target.prototype };
      
      annotation.$$processors.forEach((processor) => processor(target));

      const result = fn.apply(ctx, params);

      if (result && name) {
        target[`$$${name}`] = result;
      }
    }
  }
  annotation.$$processors = [];
  annotation.extends = function (base) {
    annotation.$$processors.push(base);

    return annotation;
  }
  annotation.requires = function () {

    return annotation;
  }
  return annotation;
}

module.exports = {
  classAnnotation
}
