const vm = require('vm');
const path = require('path');
const Module = require('module');

module.exports = function (transformedSource, fullFilename) {
  const sandbox = createSandbox(path, fullFilename);
  const script = new vm.Script(transformedSource.code);
  const context = vm.createContext(sandbox);

  script.runInContext(context);

  return context.exports.default; // Vue component prototype
};

const createSandbox = (fullFilename) => {
  const sandbox = global;

  sandbox.__filename = fullFilename;
  sandbox.__dirname = path.dirname(fullFilename);

  const module = new Module(sandbox.__filename);
  module.filename = sandbox.__filename;
  module.paths = Module._nodeModulePaths(sandbox.__dirname);

  sandbox.exports = module.exports;
  sandbox.module = module;
  sandbox.require = module.require.bind(module);

  // console.log({sandbox, module});
  //
  return sandbox;
};