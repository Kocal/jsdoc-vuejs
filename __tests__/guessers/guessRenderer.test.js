const guessRenderer = require('../../lib/guessers/guessRenderer')

describe('guessRenderer', () => {
  test('guess default', () => {
    expect(guessRenderer()).toBe('default')
    expect(guessRenderer('default')).toBe('default')
  })

  test('guess docstrap', () => {
    expect(guessRenderer('./node_modules/ink-docstrap/template')).toBe('docstrap')
  })

  test('guess minami', () => {
    expect(guessRenderer('node_modules/minami')).toBe('minami')
  })

  test('guess tui', () => {
    expect(guessRenderer('node_modules/tui-jsdoc-template')).toBe('tui')
  })

  test('guess unsupported', () => {
    console.warn = jest.fn()

    expect(guessRenderer('foo-bar')).toBe('default')
    expect(console.warn).toHaveBeenCalledWith(`The template "foo-bar" is not recognized by jsdoc-vuejs. Using default template as fallback.`)
  })
})
