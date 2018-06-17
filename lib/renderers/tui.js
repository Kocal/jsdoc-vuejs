module.exports = function renderTui(description, props = [], data = [], computed = []) {
  let html = description;

  // eslint-disable-next-line no-console
  console.log('Using tui renderer');

  if (props.length > 0) {
    html += '<h3 data-vue="section-props">Props</h3>';
    html += JSON.stringify(props);
  }

  if (data.length > 0) {
    html += '<h3 data-vue="section-data">Data</h3>';
    html += JSON.stringify(data);
  }

  if (computed.length > 0) {
    html += '<h3 data-vue="section-computed">Computed</h3>';
    html += JSON.stringify(computed);
  }

  return html;
};
