const Discoverer = require('../extensions/discoverer');

function contextConfigurator(fn) {
  return function (context) {
    const ctx = {
      register() {
        return context.register();
      },
      extend(configurator) {
        configurator(context);
      },
      discover(config) {
        context.locate('Discoverer').search(config);
      }
    };

    fn.call(ctx, context);
  }
}

module.exports = contextConfigurator;
