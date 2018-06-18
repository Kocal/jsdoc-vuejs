exports.name = 'vue-prop';

exports.options = {
  canHaveType: true,
  canHaveName: true,
  onTagged(doclet, tag) {
    doclet._isVueDoc = true;
    doclet._vueProps = doclet._vueProps || [];
    doclet._vueProps.push(tag.value || {});
  },
};
