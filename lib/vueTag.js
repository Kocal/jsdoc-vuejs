exports.name = 'vue';

exports.options = {
  mustHaveValue: false,
  onTagged(doclet, tag) {
    doclet.scope = 'vue';
    doclet.kind = 'module';
    doclet.alias = 'Vue/' + doclet.meta.filename.split('.')[0];
  }
};
