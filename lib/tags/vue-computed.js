exports.name = 'vue-computed';

exports.options = {
  canHaveType: true,
  canHaveName: true,
  onTagged(doclet, tag) {
    doclet._isVueDoc = true;
    doclet._vueComputed = doclet._vueComputed || [];
    doclet._vueComputed.push(tag.value || {});
  },
};
