exports.name = 'vue-prop'

exports.options = {
  onTagged (doclet, tag) {
    console.log(doclet, tag)
  }
}
