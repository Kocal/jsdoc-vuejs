const vm = require('vm')
const path = require('path')
const Module = require('module')

/**
 * Extract prototype from a Vue Component, after a passage of Babel.
 * @param {Object} transformedSource
 * @param {String} fullFilename
 */
module.exports = function (transformedSource, fullFilename) {
  const sandbox = createSandbox(fullFilename)
  const context = vm.createContext(sandbox)
  const script = new vm.Script(`
    // transform ES6 import/exports to require/module.exports (NodeJS compatible)
    require('babel-register');
    
    ${transformedSource.code}`
  )

  script.runInContext(context)

  return context.exports.default // Vue component prototype
}

/**
 * Create sandbox for vm.
 * @param {String} fullFilename
 * @return {Object}
 */
const createSandbox = (fullFilename) => {
  const sandbox = global
  sandbox.__filename = fullFilename
  sandbox.__dirname = path.dirname(fullFilename)

  const module = new Module(sandbox.__filename)
  module.filename = sandbox.__filename
  module.paths = [
    ...Module._nodeModulePaths(__dirname),
    ...Module._nodeModulePaths(sandbox.__dirname)
  ]

  sandbox.exports = module.exports
  sandbox.module = module
  sandbox.require = module.require.bind(module)

  return sandbox
}
