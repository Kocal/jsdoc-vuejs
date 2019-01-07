exports.name = 'vue-event';

exports.options = {
  canHaveType: true, // type of event-payload
  canHaveName: true, // name of emitted event
  onTagged(doclet, tag) {
    doclet._isVueDoc = true;
    doclet._vueEvent = doclet._vueEvent || [];
    doclet._vueEvent.push(tag.value || {});
  },
};
