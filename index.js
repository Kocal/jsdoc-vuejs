const path = require('path');

const compiler = require('vue-template-compiler');

const transformSource = require('./lib/sourceTransformer');
const extractVueComponentPrototype = require('./lib/vueComponentPrototypeExtractor');
const vueTag = require('./lib/vueTag');

const handleDocletForMethodsAndHooks = require('./lib/docletHandlerForMethodsAndHooks');
const handleDocletForProps = require('./lib/docletHandlerForProps');
const handleDocletForData = require('./lib/docletHandlerForData');
const handleDocletForComputed = require('./lib/docletHandlerForComputed');

const allVueComponentPrototypes = {};

exports.handlers = {
  beforeParse(e) {
    if (/\.vue$/.test(e.filename)) {
      const componentName = path.basename(e.filename, '.vue');
      const parsedComponent = compiler.parseComponent(e.source);

      e.source = parsedComponent.script ? parsedComponent.script.content : '';

      const transformedSource = transformSource(componentName, e.source);

      allVueComponentPrototypes[e.filename] = extractVueComponentPrototype(transformedSource, e.filename);
    }
  },
  newDoclet(e) {
    if (e.doclet.scope === 'vue') {
      const file = path.join(e.doclet.meta.path, e.doclet.meta.filename);
      const vueComponentPrototype = allVueComponentPrototypes[file];

      /*
       * Dirty tricks, only supports default template at the moment.
       * We should find a way to write subsections like « Methods » one,
       * outside this doclet description...
       */
      e.doclet.description = `</p></div></div>`;

      handleDocletForProps(e, vueComponentPrototype);
      handleDocletForData(e, vueComponentPrototype);
      handleDocletForComputed(e, vueComponentPrototype);

      e.doclet.description += `<div class="container-overview"><div><p>`;
    }

    handleDocletForMethodsAndHooks(e);
  }
};

exports.defineTags = function (dictionary) {
  dictionary.defineTag(vueTag.name, vueTag.options);
};
