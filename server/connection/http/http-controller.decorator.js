function HttpController(target) {
  target.prototype.$$handles = function(uri) {
    const ctrl = this;

    function iterate(iterator) {
      const { value, done } = iterator.next();
      if (!done) {
        const handler = ctrl[value];
        const { result, args } = handler.$$matches(uri);
        if (result) {
          handler.apply(ctrl, args);
          return true;
        } else {
          return iterate(iterator);
        }
      }

      return false;
    }

    if (ctrl.$$endpoints) {
      const iterator = ctrl.$$endpoints[Symbol.iterator]();
      return iterate(iterator);
    } else {
      return false;
    }
  }
}

module.exports = HttpController;
