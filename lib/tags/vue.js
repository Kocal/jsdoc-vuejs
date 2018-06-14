exports.name = 'vue'

exports.options = {
  mustHaveValue: false,
  onTagged (doclet, tag) {
    const componentName = doclet.meta.filename.split('.').slice(0, -1).join('.')

    doclet.scope = 'vue'
    doclet.kind = 'module'
    doclet.alias = 'Vue:' + componentName
  }
}
