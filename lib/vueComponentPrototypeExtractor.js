const vm = require('vm');
const Module = require('module');

module.exports = function (transformedSource) {
  const sandbox = createSandbox();
  const script = new vm.Script(transformedSource.code);
  const context = vm.createContext(sandbox);

  script.runInContext(context);

  return context.exports.default; // Vue component prototype
};

const createSandbox = () => {
  const sandbox = global;

  sandbox.__filename = "[eval]";
  sandbox.__dirname = process.cwd();

  const module = new Module(sandbox.__filename);
  sandbox.filename = sandbox.__filename;
  sandbox.paths = Module._nodeModulePaths(sandbox.__dirname);
  sandbox.module = module;
  sandbox.exports = module.exports;
  sandbox.require = module.require.bind(module);

  return sandbox;
};