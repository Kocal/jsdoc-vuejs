module.exports = function renderDefault(description, props = [], data = [], computed = []) {
  let html = description;

  // eslint-disable-next-line no-console
  console.log('Using default renderer');

  html += '</p></div></div>';

  if (props.length > 0) {
    html += '<h3 class="subsection-title" data-vue="section-props">Props</h3>';
    html += JSON.stringify(props);
  }

  if (data.length > 0) {
    html += '<h3 class="subsection-title" data-vue="section-data">Data</h3>';
    html += JSON.stringify(data);
  }

  if (computed.length > 0) {
    html += '<h3 class="subsection-title" data-vue="section-computed">Computed</h3>';
    html += JSON.stringify(computed);
  }

  html += '<div class="container-overview"><div><p>';

  return html;
};
