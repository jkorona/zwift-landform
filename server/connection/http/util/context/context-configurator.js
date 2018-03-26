function contextConfigurator(fn) {
  return function (context) {
    const ctx = {
      register() {
        return context.register();
      },
      extend(configurator) {
        configurator(context);
      }
    };

    fn.call(ctx);
  }
}

module.exports = contextConfigurator;
