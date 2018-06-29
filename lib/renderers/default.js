const makeTableHead = headers => `<thead><th>${headers.join('</th><th>')}</th></thead>`;
const makeTableBody = (items, cb) => `<tbody>${items.map(item => `<tr>${cb(item).trim()}</tr>`).join('')}</tbody>`;
const renderTypes = require('./utils/renderTypes');

module.exports = function renderDefault(description, props = [], data = [], computed = []) {
  let html = description;

  // eslint-disable-next-line no-console
  console.log('Using default renderer');

  html += '</p></div></div>';

  if (props.length > 0) {
    html += '<h3 class="subsection-title" style="margin-top: 1em" data-jsdoc-vuejs="section-props">Props</h3>';
    html += '<table data-jsdoc-vuejs="table-props">';
    html += makeTableHead(['Name', 'Type', 'Default value', 'Required ?', 'Description']);
    html += makeTableBody(props, item => `
      <td><b>${item.name}</b></td>
      <td>${renderTypes(item.type.names || [])}</td>
      <td>${typeof item.defaultvalue === 'undefined' ? '-' : `<code>${item.defaultvalue}</code>`}</td>
      <td>${item.optional ? 'No' : '<b>Yes</b>'}</td>
      <td>${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  if (data.length > 0) {
    html += '<h3 class="subsection-title" style="margin-top: 1em" data-jsdoc-vuejs="section-data">Data</h3>';
    html += '<table data-jsdoc-vuejs="table-data">';
    html += makeTableHead(['Name', 'Type', 'Default value', 'Description']);
    html += makeTableBody(data, item => `
      <td><b>${item.name}</b></td>
      <td>${renderTypes(item.type.names || [])}</td>
      <td>${typeof item.defaultvalue === 'undefined' ? '-' : `<code>${item.defaultvalue}</code>`}</td>
      <td>${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  if (computed.length > 0) {
    html += '<h3 class="subsection-title" style="margin-top: 1em" data-jsdoc-vuejs="section-computed">Computed</h3>';
    html += '<table data-jsdoc-vuejs="table-computed">';
    html += makeTableHead(['Name', 'Type', 'Description']);
    html += makeTableBody(computed, item => `
      <td><b>${item.name}</b></td>
      <td>${renderTypes(item.type.names || [])}</td>
      <td>${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  html += '<div class="container-overview"><div><p>';

  return html;
};
