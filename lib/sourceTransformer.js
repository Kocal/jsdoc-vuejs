const babel = require('babel-core');

/**
 * Transform a source code into Babel.
 * @param {String} componentName
 * @param {String} source
 * @return {Object}
 */
module.exports = function (componentName, source) {
  return babel.transform(source, {
    presets: ['es2015'],
    plugins: [
      "transform-object-rest-spread"
    ]
  });
};