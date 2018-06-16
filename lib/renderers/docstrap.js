module.exports = function (html, props = [], data = [], computed = []) {
  console.log('Using docstrap renderer')

  if (props.length > 0) {
    html += '<h3 data-vue="section-props">Props</h3>'
    html += JSON.stringify(props)
  }

  if (data.length > 0) {
    html += '<h3 data-vue="section-data">Data</h3>'
    html += JSON.stringify(data)
  }

  if (computed.length > 0) {
    html += '<h3 data-vue="section-computed">Computed</h3>'
    html += JSON.stringify(computed)
  }

  return html
}
