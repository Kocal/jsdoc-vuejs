const buildTable = require('./tableBuilder');

module.exports = function (e, vueComponentPrototype) {
  const computed = extractComputed(vueComponentPrototype);
  const computedTable = buildTable(computed, {'name': 'Name'});

    e.doclet.description += `<h3 class="subsection-title">Computed</h3>${computed.length === 0 ? '<p>No computed data to display.</p>' : computedTable}`;
};

const extractComputed = (vueComponentPrototype) => {
  const computed = vueComponentPrototype.computed || {};

  return Object.keys(computed).reduce((acc, currentComputedName) => {
    acc.push({
      name: currentComputedName
    });

    return acc;
  }, []);
};