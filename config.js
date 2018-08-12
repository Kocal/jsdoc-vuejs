const config = require('jsdoc/env');
const getTemplatePath = require('./lib/core/getTemplatePath');

config['jsdoc-vuejs'] = config['jsdoc-vuejs'] || {};

// Detect JSDoc template if not specified
if (!Object.prototype.hasOwnProperty.call(config['jsdoc-vuejs'], 'template')) {
  config['jsdoc-vuejs'].template = getTemplatePath(config.opts.template || 'default');
}

module.exports = config;
