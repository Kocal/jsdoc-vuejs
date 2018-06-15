module.exports = function (html, props = [], data = [], computed = []) {
  html += '</p></div></div>'

  if (props.length > 0) {
    html += '<h3 class="subsection-title">Props</h3>'
    html += JSON.stringify(props)
  }

  if (data.length > 0) {
    html += '<h3 class="subsection-title">Data</h3>'
    html += JSON.stringify(data)
  }

  if (computed.length > 0) {
    html += '<h3 class="subsection-title">Computed</h3>'
    html += JSON.stringify(computed)
  }

  html += `<div class="container-overview"><div><p>`

  return html
}
