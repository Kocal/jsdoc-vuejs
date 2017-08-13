module.exports = function (data, headers) {
  return `<table>
<thead>
<tr>
${printHeaders(headers)}
</tr>
</thead>
<tbody>
${printRows(data, headers)}
</tbody>
</table>`.replace(/\r?\n/g, '');
};

const printHeaders = (headers) => {
  return Object.keys(headers)
    .map(headerKey => `<th>${headers[headerKey]}</th>`)
    .join('')
};

const printRows = (data, headers) => {
  return data.map(currentData => printRow(currentData, headers)).join('')
};

const printRow = (data, headers) => {
  return `<tr>${
    Object.keys(headers)
      .map(headerKey => `<td>${data[headerKey]}</td>`)
      .join('')
    }</tr>`
};