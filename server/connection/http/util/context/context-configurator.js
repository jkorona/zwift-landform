function contextConfigurator(fn) {
  return function (context) {
    const ctx = {
      register() {
        return context.register();
      }
    };

    fn.call(ctx);
  }
}

module.exports = contextConfigurator;
