module.exports = function guessRenderer(template) {
  // eslint-disable-next-line no-param-reassign
  template = template || 'default';

  switch (true) {
    case template === 'default':
      return 'default';
    case /ink-docstrap\/template/.test(template):
      return 'docstrap';
    case /minami/.test(template):
      return 'minami';
    case /tui-jsdoc-template/.test(template):
      return 'tui';
    default:
      // eslint-disable-next-line no-console
      console.warn(`The template "${template}" is not recognized by jsdoc-vuejs. Using default template as fallback.`);
      return 'default';
  }
};
