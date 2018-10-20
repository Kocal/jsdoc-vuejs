const config = Object.assign({}, require('./.jsdoc'));

config.opts.destination = 'docs-minami';
config.opts.template = './node_modules/minami';

module.exports = config;
