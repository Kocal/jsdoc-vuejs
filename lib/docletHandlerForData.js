const buildTable = require('./tableBuilder');
const extractData = require("./extractors").extractData;

module.exports = function (e, vueComponentPrototype) {
  const data = extractData(vueComponentPrototype);
  const dataTable = buildTable(data, {name: 'Name'});

  e.doclet.description += `<h3 class="subsection-title">Data</h3>${data.length === 0 ? '<p>No data to display.</p>' : dataTable}`;
};
