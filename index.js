const config = require('./config');
const render = require('./lib/core/renderer');
const extractVueScript = require('./lib/core/vueScriptExtractor');
const seekExportDefaultLine = require('./lib/core/seekExportDefaultLine');
const vueDataTag = require('./lib/tags/vue-data');
const vuePropTag = require('./lib/tags/vue-prop');
const vueComputedTag = require('./lib/tags/vue-computed');

// Used to compute good line number for Vue methods
const exportDefaultLines = {};
const mainDocletLines = {};

exports.handlers = {
  beforeParse(e) {
    if (/\.vue$/.test(e.filename)) {
      exportDefaultLines[e.filename] = seekExportDefaultLine(e.source);
      e.source = extractVueScript(e.filename);
    }
  },
  newDoclet(e) {
    if (e.doclet.meta.filename.endsWith('.vue')) {
      const fullPath = `${e.doclet.meta.path}/${e.doclet.meta.filename}`;
      const componentName = e.doclet.meta.filename.replace(/\.vue$/, '');

      // The main doclet before `export default {}`
      if (e.doclet.longname === 'module.exports') {
        mainDocletLines[fullPath] = e.doclet.meta.lineno;
      }

      // It can be the main doclet before `export default {}`
      // with at least one `@vue-*` tag
      if (e.doclet._isVueDoc) {
        const { renderer } = config['jsdoc-vuejs'];
        const props = e.doclet._vueProps || [];
        const data = e.doclet._vueData || [];
        const computed = e.doclet._vueComputed || [];

        e.doclet.kind = 'module';
        e.doclet.name = componentName;
        e.doclet.alias = componentName;
        e.doclet.longname = componentName;
        e.doclet.description = render(renderer, e.doclet.description || '', props, data, computed);

        // Remove meta for not rendering source for this doclet
        delete e.doclet.meta;
      }

      // Methods and hooks
      if (e.doclet.kind === 'function' && 'memberof' in e.doclet) {
        if (e.doclet.memberof.endsWith('.methods')) {
          e.doclet.scope = 'instance';
          e.doclet.memberof = e.doclet.memberof.replace(/\.methods$/, ''); // force method to be displayed
          e.doclet.meta.lineno += exportDefaultLines[fullPath] - mainDocletLines[fullPath];
        } else {
          e.doclet.memberof = null; // don't include Vue hooks
        }
      }
    }
  },
};

exports.defineTags = function defineTags(dictionary) {
  dictionary.defineTag(vueDataTag.name, vueDataTag.options);
  dictionary.defineTag(vuePropTag.name, vuePropTag.options);
  dictionary.defineTag(vueComputedTag.name, vueComputedTag.options);
};
