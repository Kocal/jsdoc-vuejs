const env = require('jsdoc/env')

const initialConfig = {
  followImports: true
}
const config = Object.assign({}, initialConfig, env.conf['jsdoc-vuejs'])

module.exports = config
