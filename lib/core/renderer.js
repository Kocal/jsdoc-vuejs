const renderers = require('../renderers');

module.exports = function render(renderer, html, props, data, computed) {
  return renderers[renderer](html, props, data, computed);
};
