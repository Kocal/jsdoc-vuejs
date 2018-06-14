const path = require('path')
const compiler = require('vue-template-compiler')

require('./lib/requireHookForVue')
const extractVueComponentPrototype = require('./lib/vueComponentPrototypeExtractor')
const vueTag = require('./lib/vueTag')
const docletHandlers = require('./lib/docletHandlers')

const allVueComponentPrototypes = {}

exports.handlers = {
  beforeParse (e) {
    if (/\.vue$/.test(e.filename)) {
      const parsedComponent = compiler.parseComponent(e.source)
      const source = parsedComponent.script ? parsedComponent.script.content : ''

      e.source = source
      allVueComponentPrototypes[e.filename] = extractVueComponentPrototype(source, e.filename)
    }
  },
  newDoclet (e) {
    if (e.doclet.scope === 'vue') {
      const file = path.join(e.doclet.meta.path, e.doclet.meta.filename)
      const vueComponentPrototype = allVueComponentPrototypes[file]

      /*
       * Dirty tricks, only supports default template at the moment.
       * We should find a way to write subsections like « Methods » one,
       * outside this doclet description...
       */
      e.doclet.description = `</p></div></div>`

      docletHandlers.handleProps(e, vueComponentPrototype)
      docletHandlers.handleComputed(e, vueComponentPrototype)
      docletHandlers.handleData(e, vueComponentPrototype)

      e.doclet.description += `<div class="container-overview"><div><p>`
    }

    docletHandlers.handleMethodsAndHooks(e)
  }
}

exports.defineTags = function (dictionary) {
  dictionary.defineTag(vueTag.name, vueTag.options)
}
