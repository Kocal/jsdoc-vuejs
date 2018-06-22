const config = Object.assign({}, require('./jsdoc'));

config.opts.destination = 'docs-docstrap';
config.opts.template = './node_modules/ink-docstrap/template';

module.exports = config;
