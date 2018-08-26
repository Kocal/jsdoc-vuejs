/* eslint-disable no-console */
const { normalize } = require('path');
const getTemplatePath = require('../../lib/core/getTemplatePath');

describe('guessTemplatePath', () => {
  test('guess default', () => {
    expect(getTemplatePath().endsWith(normalize('lib/templates/default.ejs'))).toBeTruthy();
    expect(getTemplatePath('default').endsWith(normalize('lib/templates/default.ejs'))).toBeTruthy();
  });

  test('guess docstrap', () => {
    const templatePath = getTemplatePath('./node_modules/ink-docstrap/template');

    expect(templatePath.endsWith(normalize('lib/templates/docstrap.ejs'))).toBeTruthy();
  });

  test('guess minami', () => {
    const templatePath = getTemplatePath('node_modules/minami');

    expect(templatePath.endsWith(normalize('lib/templates/minami.ejs'))).toBeTruthy();
  });

  test('guess tui', () => {
    const templatePath = getTemplatePath('node_modules/tui-jsdoc-template');

    expect(templatePath.endsWith(normalize('lib/templates/tui.ejs'))).toBeTruthy();
  });

  test('guess unsupported', () => {
    console.warn = jest.fn();

    expect(getTemplatePath('foo-bar').endsWith(normalize('lib/templates/default.ejs'))).toBeTruthy();
    expect(console.warn).toHaveBeenCalledWith('The template "foo-bar" is not recognized by jsdoc-vuejs. Using default template as fallback.');
  });
});
