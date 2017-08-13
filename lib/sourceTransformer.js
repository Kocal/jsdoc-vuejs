const babel = require('babel-core');

module.exports = function (componentName, source) {
  return babel.transform(source, {
    presets: ['es2015'],
    plugins: [
      "transform-object-rest-spread"
    ]
  });
};