const { htmlsafe } = require('jsdoc/lib/jsdoc/util/templateHelper');

module.exports = function renderTypes(type) {
  return ((type && type.names) || []).map(htmlsafe).join('|');
};
