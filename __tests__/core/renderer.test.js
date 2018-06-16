const fixtureProps = require('./__fixtures__/props')
const fixtureData = require('./__fixtures__/data')
const fixtureComputed = require('./__fixtures__/computed')
const render = require('../../lib/core/renderer')

xdescribe('core.renderer', () => {
  beforeAll(() => {
    console.log = jest.fn()
  })

  afterAll(() => {
    console.log.mockRestore()
  })

  ;['default', 'docstrap', 'minami', 'pixi', 'tui'].forEach(renderer => {
    test(`core.renderer.${renderer}`, () => {
      expect(render(renderer, [], [], [])).toMatchSnapshot()
      expect(render(renderer, fixtureProps, [], [])).toMatchSnapshot()
      expect(render(renderer, [], fixtureData, [])).toMatchSnapshot()
      expect(render(renderer, [], [], fixtureComputed)).toMatchSnapshot()
      expect(render(renderer, fixtureProps, fixtureData, fixtureComputed)).toMatchSnapshot()
    })
  })
})
