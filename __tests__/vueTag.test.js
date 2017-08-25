const vueTag = require('../lib/vueTag')

describe('vueTag', () => {
  it('should be named properly', () => {
    expect(vueTag.name).toBe('vue')
  })

  it('test options', () => {
    const doclet = {
      meta: {
        filename: 'foo.bar.vue'
      }
    }

    vueTag.options.onTagged(doclet)

    expect(vueTag.options.mustHaveValue).toBeFalsy()
    expect(doclet).toEqual({
      meta: {
        filename: 'foo.bar.vue'
      },
      scope: 'vue',
      kind: 'module',
      alias: '(Vue) foo.bar'
    })
  })
})
