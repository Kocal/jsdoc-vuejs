const fs = require('fs');
const compiler = require('@vue/compiler-sfc');

module.exports = function extractVueScript(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const parsedComponent = compiler.parse(source);
  const scriptContent = parsedComponent.descriptor.script ? parsedComponent.descriptor.script.content : '';

  return scriptContent;
};
