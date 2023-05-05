/*const fs = require('fs');
const path = require('path');

module.exports = function (app) {
  const pluginsPath = path.join(__dirname, 'plugins');

  // Load all plugins in the plugins directory
  const plugins = fs
    .readdirSync(pluginsPath)
    .filter((file) => file.endsWith('.js'))
    .map((file) => require(path.join(pluginsPath, file)));

  // Integrate each plugin with the application
  plugins.forEach((plugin) => {
    const pluginOptions = app.get('config')[plugin.name];

    if (pluginOptions) {
      app.use(plugin.handler(pluginOptions));
    }
  });
};*/

const fs = require('fs');

module.exports = {
  loadPlugins: function (app) {
    // Load all plugins in the 'plugins' folder
    fs.readdirSync('./plugins').forEach(function (file) {
      // Skip non-JS files
      if (!file.endsWith('.js')) return;

      // Load plugin
      const plugin = require(`./plugins/${file}`);

      // Register routes for plugin
      plugin.registerRoutes(app);
    });
  }
};
