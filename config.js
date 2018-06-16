const config = require('jsdoc/env')
const guessRenderer = require('./lib/guessers/guessRenderer')

config['jsdoc-vuejs'] = config['jsdoc-vuejs'] || {}

// Detect JSDoc template if not specified
if (!config['jsdoc-vuejs'].hasOwnProperty('renderer')) {
  config['jsdoc-vuejs'].renderer = guessRenderer(config.opts.template || 'default')
}

module.exports = config
