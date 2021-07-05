const fs = require('fs');
const compiler = require('@vue/compiler-sfc');

module.exports = function extractVueScript(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const parsedComponent = compiler.parse(source);
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : '';

  return scriptContent;
};
