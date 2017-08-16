/**
 * Extract props from a Vue component prototype.
 * @param {Object} vueComponentPrototype
 * @return {Array.<Object>}
 */
module.exports.extractProps = (vueComponentPrototype) => {
  const props = vueComponentPrototype.props || {};

  return Object.keys(props).reduce((acc, currentPropName) => {
    const currentProp = props[currentPropName];

    acc.push({
      name: currentPropName,
      type: typeof currentProp.type === 'function' ? currentProp.type.name : '',
      required: currentProp.required === true ? '<b>true</b>' : 'false',
      default: currentProp.default || ''
    });

    return acc;
  }, []);
};

/**
 * Extract data from a Vue component prototype.
 * @param {Object} vueComponentPrototype
 * @return {Array.<Object>}
 */
module.exports.extractData = (vueComponentPrototype) => {
  const data = typeof vueComponentPrototype.data === 'function'
    ? vueComponentPrototype.data()
    : vueComponentPrototype.data;

  return Object.keys(data || {}).reduce((acc, currentDataName) => {
    acc.push({
      name: currentDataName
    });

    return acc;
  }, []);
};

/**
 * Extract computed data from a Vue component prototype.
 * @param {Object} vueComponentPrototype
 * @return {Array.<Object>}
 */
module.exports.extractComputed = (vueComponentPrototype) => {
  const computed = vueComponentPrototype.computed || {};

  return Object.keys(computed).reduce((acc, currentComputedName) => {
    acc.push({
      name: currentComputedName
    });

    return acc;
  }, []);
};
