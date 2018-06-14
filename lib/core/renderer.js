const renderers = require('../renderers')

module.exports = function (renderer, html, props, data, computed) {
  return renderers[renderer](html, props, data, computed)
}
