const buildTable = require('./tableBuilder');

module.exports = function (e, vueComponentPrototype) {
  const data = extractData(vueComponentPrototype);
  const dataTable = buildTable(data, {name: 'Name'});

  e.doclet.description += `<h3 class="subsection-title">Data</h3>${data.length === 0 ? '<p>No data to display.</p>' : dataTable}`;
};

const extractData = (vueComponentPrototype) => {
  const data = typeof vueComponentPrototype.data === 'function'
    ? vueComponentPrototype.data()
    : vueComponentPrototype.data;

  return Object.keys(data).reduce((acc, currentDataName) => {
    acc.push({
      name: currentDataName
    });

    return acc;
  }, []);
};