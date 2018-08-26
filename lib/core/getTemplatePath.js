const { resolve } = require('path');

module.exports = function getTemplatePath(template) {
  // eslint-disable-next-line no-param-reassign
  template = template || 'default';

  const templateFilename = (() => {
    switch (true) {
      case template === 'default':
        return 'default.ejs';
      case /ink-docstrap\/template/.test(template):
        return 'docstrap.ejs';
      case /minami/.test(template):
        return 'minami.ejs';
      case /tui-jsdoc-template/.test(template):
        return 'tui.ejs';
      default:
        // eslint-disable-next-line no-console
        console.warn(`The template "${template}" is not recognized by jsdoc-vuejs. Using default template as fallback.`);
        return 'default.ejs';
    }
  })();

  const path = resolve(__dirname, '../templates', templateFilename);

  return resolve(path);
};
