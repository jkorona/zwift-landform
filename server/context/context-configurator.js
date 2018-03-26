function contextConfigurator(fn) {
  return function (context) {
    const ctx = {
      register() {
        return context.register();
      },
      extend(configurator) {
        configurator(context);
      },
      discover(config = {}) {
        
      }
    };

    fn.call(ctx);
  }
}

module.exports = contextConfigurator;
