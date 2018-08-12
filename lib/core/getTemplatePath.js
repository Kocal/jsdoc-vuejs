const { resolve } = require('path');

module.exports = function getTemplatePath(template) {
  // eslint-disable-next-line no-param-reassign
  template = template || 'default';

  const path = (() => {
    switch (true) {
      case template === 'default':
        return `${__dirname}/../templates/default.ejs`;
      case /ink-docstrap\/template/.test(template):
        return `${__dirname}/../templates/docstrap.ejs`;
      case /minami/.test(template):
        return `${__dirname}/../templates/minami.ejs`;
      case /tui-jsdoc-template/.test(template):
        return `${__dirname}/../templates/tui.ejs`;
      default:
        // eslint-disable-next-line no-console
        console.warn(`The template "${template}" is not recognized by jsdoc-vuejs. Using default template as fallback.`);
        return `${__dirname}/../templates/default.ejs`;
    }
  })();

  return resolve(path);
};
