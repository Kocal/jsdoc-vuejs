exports.name = 'vue-data';

exports.options = {
  canHaveType: true,
  canHaveName: true,
  onTagged(doclet, tag) {
    doclet._isVueDoc = true;
    doclet._vueData = doclet._vueData || [];
    doclet._vueData.push(tag.value || {});
  },
};
