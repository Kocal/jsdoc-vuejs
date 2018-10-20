const config = Object.assign({}, require('./.jsdoc'));

config.opts.destination = 'docs-tui';
config.opts.template = './node_modules/tui-jsdoc-template';

module.exports = config;
