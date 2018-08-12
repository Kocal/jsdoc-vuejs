/* eslint-disable no-console */

const getTemplatePath = require('../../lib/core/getTemplatePath');

describe('guessTemplatePath', () => {
  test('guess default', () => {
    expect(getTemplatePath().endsWith('lib/templates/default.ejs')).toBeTruthy();
    expect(getTemplatePath('default').endsWith('lib/templates/default.ejs')).toBeTruthy();
  });

  test('guess docstrap', () => {
    const templatePath = getTemplatePath('./node_modules/ink-docstrap/template');

    expect(templatePath.endsWith('lib/templates/docstrap.ejs')).toBeTruthy();
  });

  test('guess minami', () => {
    const templatePath = getTemplatePath('node_modules/minami');

    expect(templatePath.endsWith('lib/templates/minami.ejs')).toBeTruthy();
  });

  test('guess tui', () => {
    const templatePath = getTemplatePath('node_modules/tui-jsdoc-template');

    expect(templatePath.endsWith('lib/templates/tui.ejs')).toBeTruthy();
  });

  test('guess unsupported', () => {
    console.warn = jest.fn();

    expect(getTemplatePath('foo-bar').endsWith('lib/templates/default.ejs')).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith('The template "foo-bar" is not recognized by jsdoc-vuejs. Using default template as fallback.');
  });
});
