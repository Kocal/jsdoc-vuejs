const makeTableHead = headers => `<thead><th class="tui-grid-cell-head">${headers.join('</th><th class="tui-grid-cell-head">')}</th></thead>`;
const makeTableBody = (items, cb) => `<tbody>${items.map(item => `<tr>${cb(item).trim()}</tr>`).join('')}</tbody>`;
const renderTypes = require('./utils/renderTypes');

module.exports = function renderTui(description, props = [], data = [], computed = []) {
  let html = description;

  html += '</p></div></div>';
  html += `
    <style>
    .tui-grid-table {
      border: 1px solid #ccc !important;
      table-layout: fixed;
      border-collapse: collapse;
      margin: 0;
    }
    .tui-grid-cell-head {
      background-color: #eee;
      border: 1px solid #ccc !important;
      padding: 5px 8px !important;
      text-align: center;
    }
    .tui-grid-cell {
      background-color: #fbfbfb !important;
      border: 1px solid #e0e0e0 !important;
      padding: 5px 8px !important;
    }
    </style>
  `;

  // eslint-disable-next-line no-console
  console.log('Using tui renderer');

  if (props.length > 0) {
    html += '<h3 class="subsection-title" data-jsdoc-vuejs="section-props">Props</h3>';
    html += '<table class="tui-grid-table" data-jsdoc-vuejs="table-props">';
    html += makeTableHead(['Name', 'Type', 'Default value', 'Required ?', 'Description']);
    html += makeTableBody(props, item => `
      <td class="tui-grid-cell"><b>${item.name}</b></td>
      <td class="tui-grid-cell">${renderTypes(item.type.names || [])}</td>
      <td class="tui-grid-cell">${typeof item.defaultvalue === 'undefined' ? '-' : `<code>${item.defaultvalue}</code>`}</td>
      <td class="tui-grid-cell">${item.optional ? 'No' : '<b>Yes</b>'}</td>
      <td class="tui-grid-cell">${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  if (data.length > 0) {
    html += '<h3 class="subsection-title" data-jsdoc-vuejs="section-data">Data</h3>';
    html += '<table class="tui-grid-table" data-jsdoc-vuejs="table-data">';
    html += makeTableHead(['Name', 'Type', 'Default value', 'Description']);
    html += makeTableBody(data, item => `
      <td class="tui-grid-cell"><b>${item.name}</b></td>
      <td class="tui-grid-cell">${renderTypes(item.type.names || [])}</td>
      <td class="tui-grid-cell">${typeof item.defaultvalue === 'undefined' ? '-' : `<code>${item.defaultvalue}</code>`}</td>
      <td class="tui-grid-cell">${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  if (computed.length > 0) {
    html += '<h3 class="subsection-title" data-jsdoc-vuejs="section-computed">Computed</h3>';
    html += '<table class="tui-grid-table" data-jsdoc-vuejs="table-computed">';
    html += makeTableHead(['Name', 'Type', 'Description']);
    html += makeTableBody(computed, item => `
      <td class="tui-grid-cell"><b>${item.name}</b></td>
      <td class="tui-grid-cell">${renderTypes(item.type.names || [])}</td>
      <td class="tui-grid-cell">${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  html += '<div><div><p>';

  return html;
};
