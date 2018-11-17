const path = require('path');

const hasVueTagRE = /\s*\*\s*@vue/;

// Useful because we use `@vue` tag from first doclet of a .js file
// to determine if this file is a Vue Component.
/**
 * @type {Object.<String, Boolean>}
 */
const jsComponentsCache = {};

/**
 * @param {Doclet} doclet
 */
function isSingleFileComponent(doclet) {
  return doclet.meta.filename.endsWith('.vue');
}

/**
 * @param {Doclet} doclet
 */
function isJSComponent(doclet) {
  const fullPath = path.join(doclet.meta.path, doclet.meta.filename);

  if (fullPath in jsComponentsCache) {
    return jsComponentsCache[fullPath];
  }

  const res = doclet.meta.filename.endsWith('.js') && hasVueTagRE.test(doclet.comment || '');

  if (res) {
    jsComponentsCache[fullPath] = true;
  }

  return res;
}

module.exports = {
  isSingleFileComponent,
  isJSComponent,
};
