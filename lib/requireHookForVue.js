/* eslint-disable node/no-deprecated-api */

const fs = require('fs')
const compiler = require('vue-template-compiler')

/**
 * Require hook for .vue files.
 * @param {Module} module
 * @param {string} filename
 * @return {*}
 */
require.extensions['.vue'] = function (module, filename) {
  const source = fs.readFileSync(filename, 'utf8')
  const parsedComponent = compiler.parseComponent(source)
  const scriptContent = parsedComponent.script ? parsedComponent.script.content : ''

  return module._compile(scriptContent, filename)
}
