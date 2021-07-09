exports.name = 'vue-slot';

exports.options = {
  canHaveName: true,
  onTagged(doclet, tag) {
    doclet._isVueDoc = true;
    doclet._vueSlots = doclet._vueSlots || [];
    doclet._vueSlots.push(tag.value || {});
  },
};
