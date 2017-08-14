const buildTable = require('./tableBuilder');
const extractProps = require("./extractors").extractProps;

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
