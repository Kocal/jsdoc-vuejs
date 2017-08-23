const buildTable = require('./tableBuilder');
const extractors = require('./extractors');

const vueHooks = [
  'beforeCreate', 'created',
  'beforeMount', 'mounted',
  'beforeUpdate', 'updated',
  'beforeDestroy', 'destroyed'
];

/**
 * @param {Object} e
 * @param {Object} vueComponentPrototype
 */
module.exports.handleComputed = function (e, vueComponentPrototype) {
  const computed = extractors.extractComputed(vueComponentPrototype);
  const computedTable = buildTable(computed, {'name': 'Name'});

  e.doclet.description += `<h3 class="subsection-title">Computed</h3>${computed.length === 0 ? '<p>No computed data to display.</p>' : computedTable}`;
};

/**
 * @param {Object} e
 * @param {Object} vueComponentPrototype
 */
module.exports.handleData = function (e, vueComponentPrototype) {
  const data = extractors.extractData(vueComponentPrototype);
  const dataTable = buildTable(data, {name: 'Name'});

  e.doclet.description += `<h3 class="subsection-title">Data</h3>${data.length === 0 ? '<p>No data to display.</p>' : dataTable}`;
};


/**
 * @param {Object} e
 */
module.exports.handleMethodsAndHooks = function (e) {
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

/**
 * @param {Object} e
 * @param {Object} vueComponentPrototype
 */
module.exports.handleProps = function (e, vueComponentPrototype) {
  const props = extractors.extractProps(vueComponentPrototype);
  const propsTableHeaders = {
    'name': 'Name',
    'type': 'Type',
    'required': 'Required',
    'default': 'Default value'
  };

  const propsTable = buildTable(props, propsTableHeaders);

  e.doclet.description += `<h3 class="subsection-title">Props</h3>${props.length === 0 ? '<p>No props to display.</p>' : propsTable}`;
};
