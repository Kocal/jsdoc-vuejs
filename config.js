const env = require('jsdoc/env');
const getTemplatePath = require('./lib/core/getTemplatePath');

const config = env.conf || {};

config['jsdoc-vuejs'] = config['jsdoc-vuejs'] || {};

// Detect JSDoc template if not specified
if (!Object.prototype.hasOwnProperty.call(config['jsdoc-vuejs'], 'template')) {
  config['jsdoc-vuejs'].template = getTemplatePath(env.opts.template || 'default');
}

module.exports = config;
