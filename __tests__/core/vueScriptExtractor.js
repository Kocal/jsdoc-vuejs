const path = require('path')
const extractVueScript = require('../../lib/core/vueScriptExtractor')

describe('core.extractVueScript', () => {
  const filename = path.join(__dirname, '__fixtures__', 'Component.vue')

  test('extract script', () => {
    expect(extractVueScript(filename)).toMatchSnapshot()
  })
})
