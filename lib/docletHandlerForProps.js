const buildTable = require('./tableBuilder');

module.exports = function (e, vueComponentPrototype) {
  const props = extractProps(vueComponentPrototype);
  const propsTableHeaders = {
    'name': 'Name',
    'type': 'Type',
    'required': 'Required',
    'default': 'Default value'
  };

  const propsTable = buildTable(props, propsTableHeaders);

  e.doclet.description += `<h3 class="subsection-title">Props</h3>${props.length === 0 ? '<p>No props to display.</p>' : propsTable}`;
};

const extractProps = (vueComponentPrototype) => {
  const props = vueComponentPrototype.props || {};

  return Object.keys(props).reduce((acc, currentPropName) => {
    const currentProp = props[currentPropName];

    acc.push({
      name: currentPropName,
      type: typeof currentProp.type === 'function' ? currentProp.type.name : '',
      required: currentProp.required === true ? '<b>true</b>' : 'false',
      default: currentProp.default || ''
    });

    return acc;
  }, []);
};