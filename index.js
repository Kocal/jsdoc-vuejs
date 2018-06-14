const compiler = require('vue-template-compiler')

require('./lib/requireHookForVue')
const vueTag = require('./lib/vueTag')

exports.handlers = {
  beforeParse (e) {
    if (/\.vue$/.test(e.filename)) {
      const parsedComponent = compiler.parseComponent(e.source)

      e.source = parsedComponent.script ? parsedComponent.script.content : ''
    }
  }
}

exports.defineTags = function (dictionary) {
  dictionary.defineTag(vueTag.name, vueTag.options)
  dictionary.defineTag(vueDataTag.name, vueDataTag.options)
  dictionary.defineTag(vuePropTag.name, vuePropTag.options)
  dictionary.defineTag(vueComputedTag.name, vueComputedTag.options)
}
