const fs = require('fs');
const compiler = require('vue-template-compiler');

module.exports = function extractVueScript(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const parsedComponent = compiler.parseComponent(source);
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : '';

  return scriptContent;
};
