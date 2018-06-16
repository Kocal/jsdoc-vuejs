const config = require('./config')
const render = require('./lib/core/renderer')
const extractVueScript = require('./lib/core/vueScriptExtractor')
const vueDataTag = require('./lib/tags/vue-data')
const vuePropTag = require('./lib/tags/vue-prop')
const vueComputedTag = require('./lib/tags/vue-computed')

exports.handlers = {
  beforeParse (e) {
    if (/\.vue$/.test(e.filename)) {
      e.source = extractVueScript(e.filename)
    }
  },
  newDoclet (e) {
    if (e.doclet.meta.filename.endsWith('.vue')) {
      const componentName = e.doclet.meta.filename.replace(/\.vue$/, '')

      // if (e.doclet.memberof === 'module.exports') {
      //   e.doclet.memberof = componentName
      // }
      //
      // if (e.doclet.longname.startsWith('module.exports.')) {
      //   e.doclet.longname = e.doclet.longname.replace('module.exports.', componentName)
      // }

      if (e.doclet._isVueDoc) {
        const { renderer } = config['jsdoc-vuejs']
        const props = e.doclet._vueProps || []
        const data = e.doclet._vueData || []
        const computed = e.doclet._vueComputed || []

        e.doclet.kind = 'module'
        e.doclet.name = e.doclet.alias = e.doclet.longname = componentName
        e.doclet.description = render(renderer, e.doclet.description || '', props, data, computed)

        // Remove meta for not rendering source for this doclet
        delete e.doclet.meta
      }
    }
  }
}

exports.defineTags = function (dictionary) {
  dictionary.defineTag(vueDataTag.name, vueDataTag.options)
  dictionary.defineTag(vuePropTag.name, vuePropTag.options)
  dictionary.defineTag(vueComputedTag.name, vueComputedTag.options)
}
