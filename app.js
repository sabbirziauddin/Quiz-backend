const express = require('express');
const app = express();

// Load configuration settings
const config = require('./config');

// Load plugin-loader
const pluginLoader = require('./plugin-loader');

// Require core pluigns
///const sessionPlugin = require('./plugins/session');
///const nicknamePlugin = require('./plugins/nickname');

// Automatically load all plugins
pluginLoader.loadPlugins(app);

// Start server
app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});
