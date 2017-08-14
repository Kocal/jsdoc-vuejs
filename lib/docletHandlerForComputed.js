const buildTable = require('./tableBuilder');
const extractComputed = require("./extractors").extractComputed;

module.exports = function (e, vueComponentPrototype) {
  const computed = extractComputed(vueComponentPrototype);
  const computedTable = buildTable(computed, {'name': 'Name'});

  e.doclet.description += `<h3 class="subsection-title">Computed</h3>${computed.length === 0 ? '<p>No computed data to display.</p>' : computedTable}`;
};
