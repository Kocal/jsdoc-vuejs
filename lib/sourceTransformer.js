const babel = require('babel-core');

module.exports = function (componentName, source) {
  return babel.transform(source, {
    presets: ['es2015'],
  });

  // transformation.code = transformation.code.replace('exports.default = {', `const ${componentName} = {`);
};