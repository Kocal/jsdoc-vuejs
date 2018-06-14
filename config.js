let config = {}

try {
  const env = require('jsdoc/env')
  config = Object.assign({}, config, env.conf['jsdoc-vuejs'])
} catch (e) {

}

module.exports = config
