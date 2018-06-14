exports.name = 'vue-component'

exports.options = {
  onTagged (doclet, tag) {
    console.log(doclet, tag)
  }
}
