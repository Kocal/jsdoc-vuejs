const config = require('jsdoc/env');
const guessRenderer = require('./lib/core/guessRenderer');

config['jsdoc-vuejs'] = config['jsdoc-vuejs'] || {};

// Detect JSDoc template if not specified
if (!Object.prototype.hasOwnProperty.call(config['jsdoc-vuejs'], 'renderer')) {
  config['jsdoc-vuejs'].renderer = guessRenderer(config.opts.template || 'default');
}

module.exports = config;
