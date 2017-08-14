const vm = require('vm');
const path = require('path');
const Module = require('module');

module.exports = function (transformedSource, fullFilename) {
  const sandbox = createSandbox(fullFilename);
  const context = vm.createContext(sandbox);
  const script = new vm.Script(`
    // transform ES6 import/exports to require/module.exports (NodeJS compatible)
    require('${computeNodeModulePath('babel-register')}');
    
    ${transformedSource.code}`
  );

  script.runInContext(context);

  return context.exports.default; // Vue component prototype
};

const createSandbox = (fullFilename) => {
  const sandbox = global;
  sandbox.__filename = fullFilename;
  sandbox.__dirname = path.dirname(fullFilename);

  const module = new Module(sandbox.__filename);
  module.filename = sandbox.__filename;
  module.paths = [
    ...Module._nodeModulePaths(__dirname),
    ...Module._nodeModulePaths(sandbox.__dirname),
  ];

  sandbox.exports = module.exports;
  sandbox.module = module;
  sandbox.require = module.require.bind(module);

  return sandbox;
};

/**
 * Return full-path of `moduleName` module.
 * @param {String} moduleName
 * @return {String}
 */
const computeNodeModulePath = (moduleName) => {
  return path.join(
    path.dirname(__dirname),
    'node_modules',
    moduleName
  );
};