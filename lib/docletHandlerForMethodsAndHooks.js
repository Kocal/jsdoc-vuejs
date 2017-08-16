const vueHooks = [
  'beforeCreate', 'created',
  'beforeMount', 'mounted',
  'beforeUpdate', 'updated',
  'beforeDestroy', 'destroyed'
];

module.exports = function (e) {
  // handle functions in .vue
  if (e.doclet.meta.filename.endsWith('.vue') && e.doclet.kind === 'function') {
    e.doclet.scope = 'instance';

    if ((e.doclet.memberof || '').endsWith('.methods')) { // is a method
      e.doclet.memberof = e.doclet.memberof.split('.')[0];
    }

    if (vueHooks.includes(e.doclet.name)) {
      e.doclet.name = `[Hook] ${e.doclet.name}`;
    }
  }
};