const path = require('path');

const compiler = require('vue-template-compiler');

const transformSource = require('./lib/sourceTransformer');
const extractVueComponentPrototype = require('./lib/vueComponentPrototypeExtractor');
const vueTag = require('./lib/vueTag');

const allVueComponentPrototypes = {};
const vueHooks = [
  'beforeCreate', 'created',
  'beforeMount', 'mounted',
  'beforeUpdate', 'updated',
  'beforeDestroy', 'destroyed'
];

exports.handlers = {
  beforeParse(e) {
    if (/\.vue$/.test(e.filename)) {
      const componentName = path.basename(e.filename, '.vue');
      const parsedComponent = compiler.parseComponent(e.source);

      e.source = parsedComponent.script ? parsedComponent.script.content : '';

      const transformedSource = transformSource(componentName, e.source);
      const vueComponentPrototype = extractVueComponentPrototype(transformedSource);

      allVueComponentPrototypes[e.filename] = vueComponentPrototype;
    }
  },
  newDoclet(e) {
    // handle functions in .vue
    if (e.doclet.meta.filename.endsWith('.vue') && e.doclet.kind === 'function') {
      e.doclet.scope = 'instance';

      if (e.doclet.memberof.endsWith('.methods')) { // is a method
        e.doclet.memberof = e.doclet.memberof.split('.')[0];
      }

      if (vueHooks.includes(e.doclet.name)) {
        e.doclet.name = `[Hook] ${e.doclet.name}`;
      }
    }
  }
};

exports.defineTags = function (dictionary) {
  dictionary.defineTag(vueTag.name, vueTag.options);
};
