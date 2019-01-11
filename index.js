const { join } = require('path');
const config = require('./config');
const render = require('./lib/core/renderer');
const extractVueScript = require('./lib/core/vueScriptExtractor');
const seekExportDefaultLine = require('./lib/core/seekExportDefaultLine');
const { isSingleFileComponent, isJSComponent } = require('./lib/core/issers');
const vueDataTag = require('./lib/tags/vue-data');
const vuePropTag = require('./lib/tags/vue-prop');
const vueComputedTag = require('./lib/tags/vue-computed');

// Used to compute good line number for Vue methods
const exportDefaultLines = {};
const mainDocletLines = {};

exports.handlers = {
  beforeParse(e) {
    if (/\.vue$/.test(e.filename)) {
      exportDefaultLines[e.filename] = seekExportDefaultLine(e.source, e.filename);
      e.source = extractVueScript(e.filename);
    }
  },
  newDoclet(e) {
    const fileIsSingleFileComponent = isSingleFileComponent(e.doclet);
    const fileIsJSComponent = isJSComponent(e.doclet);

    if (!fileIsSingleFileComponent && !fileIsJSComponent) {
      return;
    }

    const fullPath = join(e.doclet.meta.path, e.doclet.meta.filename);
    const componentName = e.doclet.meta.filename.replace(/\.(vue|js)$/, '');
    const is_mixin = componentName.endsWith('Mixin'); // ugly - don't know jsDoc well enough to come up with something better
    const is_module_exports = e.doclet.longname === 'module.exports';

    // The main doclet before `export default {}`
    if (is_module_exports) {
      const kind = is_mixin ? 'mixin' : 'module';
      e.doclet.kind = kind;
      e.doclet.memberof = kind;
      e.doclet.name = componentName;
      e.doclet.alias = componentName;
      e.doclet.longname = `${e.doclet.kind}:${componentName}`;
    }

    if (
        !/[.~#]/.test(e.doclet.longname) // filter component's properties and member, not the best way but it works
        && is_module_exports
    ) {
      mainDocletLines[fullPath] = e.doclet.meta.lineno;
    }

    // It can be the main doclet before `export default {}`
    // with at least one `@vue-*` tag
    if (e.doclet._isVueDoc) {
      const { template } = config['jsdoc-vuejs'];
      const data = {
        props: e.doclet._vueProps || [],
        data: e.doclet._vueData || [],
        computed: e.doclet._vueComputed || [],
      };

      render(template, data, (err, str) => {
        if (err) throw err;

        e.doclet.description = (e.doclet.description || '') + str;
      });

      // Remove meta for not rendering source for this doclet
      delete e.doclet.meta;
    }

    const is_method_and_hooks = e.doclet.kind === 'function' && 'memberof' in e.doclet

    // Methods and hooks
    if (is_method_and_hooks) {

      if (e.doclet.memberof.endsWith('.methods')) {
        e.doclet.scope = 'instance';
        e.doclet.memberof = e.doclet.memberof.replace(/\.methods$/, ''); // force method to be displayed
        e.doclet.longname = e.doclet.longname.replace(/\.methods\./, '#'); // force method to be instance

        if (fileIsSingleFileComponent) {
          e.doclet.meta.lineno += exportDefaultLines[fullPath] - mainDocletLines[fullPath];
        }

        if (is_mixin) {
          e.doclet.memberof = e.doclet.memberof.replace(/^mixin:/, ''); // remove "mixin:"-prefix. Seems to be neccesery
        }


      } else if (!is_mixin) {
        e.doclet.memberof = null; // don't include Vue hooks
      }
    }
  },
};

exports.defineTags = function defineTags(dictionary) {
  dictionary.defineTag(vueDataTag.name, vueDataTag.options);
  dictionary.defineTag(vuePropTag.name, vuePropTag.options);
  dictionary.defineTag(vueComputedTag.name, vueComputedTag.options);
};
