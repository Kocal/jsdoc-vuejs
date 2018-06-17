const makeTableHead = headers => `<thead><th>${headers.join('</th><th>')}</th></thead>`;
const makeTableBody = (items, cb) => `<tbody>${items.map(item => `<tr>${cb(item).trim()}</tr>`).join('')}</tbody>`;

module.exports = function renderDocstrap(description, props = [], data = [], computed = []) {
  let html = description;

  html += '</p></div></div>';

  // eslint-disable-next-line no-console
  console.log('Using docstrap renderer');

  if (props.length > 0) {
    html += '<h3 class="subsection-title" data-jsdoc-vuejs="section-props">Props</h3>';
    html += '<hr>';
    html += '<table class="table table-responsive table-hover table-striped" data-jsdoc-vuejs="table-props">';
    html += makeTableHead(['Name', 'Type', 'Default value', 'Required ?', 'Description']);
    html += makeTableBody(props, item => `
      <td><b>${item.name}</b></td>
      <td>${(item.type.names || []).join(', ')}</td>
      <td>${typeof item.defaultvalue === 'undefined' ? '-' : `<code>${item.defaultvalue}</code>`}</td>
      <td>${item.optional ? 'No' : '<b>Yes</b>'}</td>
      <td>${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  if (data.length > 0) {
    html += '<h3 class="subsection-title" data-jsdoc-vuejs="section-data">Data</h3>';
    html += '<hr>';
    html += '<table class="table table-responsive table-hover table-striped" data-jsdoc-vuejs="table-data">';
    html += makeTableHead(['Name', 'Type', 'Default value', 'Description']);
    html += makeTableBody(data, item => `
      <td><b>${item.name}</b></td>
      <td>${(item.type.names || []).join(', ')}</td>
      <td>${typeof item.defaultvalue === 'undefined' ? '-' : `<code>${item.defaultvalue}</code>`}</td>
      <td>${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  if (computed.length > 0) {
    html += '<h3 class="subsection-title" data-jsdoc-vuejs="section-computed">Computed</h3>';
    html += '<hr>';
    html += '<table class="table table-responsive table-hover table-striped" data-jsdoc-vuejs="table-computed">';
    html += makeTableHead(['Name', 'Type', 'Description']);
    html += makeTableBody(computed, item => `
      <td><b>${item.name}</b></td>
      <td>${(item.type.names || []).join(', ')}</td>
      <td>${typeof item.description === 'undefined' ? '-' : item.description}</td>
    `);
    html += '</table>';
  }

  html += '<div class="container-overview"><div><p>';

  return html;
};
