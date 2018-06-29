const { htmlsafe } = require('jsdoc/lib/jsdoc/util/templateHelper');

module.exports = function renderTypes(types) {
  return types.map(htmlsafe).join('|');
};
