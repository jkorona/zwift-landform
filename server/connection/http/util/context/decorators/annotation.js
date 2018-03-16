const assert = require('assert');

function collectParams(params) {
  let name, fn;

  if (params.length === 1) {
    fn = params[0];
    name = fn.name;
  } else {
    name = params[0];
    fn = params[1];
  }

  assert(name, 'You have to provide explicit name or named function.');

  return { name, fn };
}

function checkRequired(annotation, target) {
  console.log(annotation.annotationName);
  (annotation.$$required || [])
    .forEach((required) => assert(
      target[required],
      `Required annotation ${required} missing. That might be order issue.`
    ));
}

function runProcessors(processors, target) {
  processors.forEach((processor) => processor(target));
}

function classAnnotation(...params) {
  const { name, fn } = collectParams(params);

  function annotation(...params) {
    return (target) => {
      const ctx = { class: target, prototype: target.prototype };

      runProcessors(annotation.$$processors, target);
      checkRequired(annotation, target);

      target[name] = fn.apply(ctx, params) || true;
    }
  }
  
  annotation.$$processors = [];
  annotation.$$required = [];
  annotation.annotationName = name;

  annotation.extends = function (base) {
    annotation.$$processors.push(base);

    return annotation;
  }
  annotation.requires = function (type) {
    if (typeof type !== 'string') {
      type = type.annotationName;
    }
    annotation.$$required.push(type);

    return annotation;
  }
  return annotation;
}

module.exports = {
  classAnnotation
}
