const path = require('path')
const fs = require('fs')
const vueCompiler = require('vue-template-compiler')

const transformSource = require('../lib/sourceTransformer')
const extractVueComponent = require('../lib/vueComponentPrototypeExtractor')

const readFileAndExtractVueComponent = (filename, cb) => {
  fs.readFile(filename, 'utf8', (err, content) => {
    expect(err).toBeNull()

    const parsedComponent = vueCompiler.parseComponent(content)

    expect(parsedComponent.script).not.toBeNull()
    expect(parsedComponent.script.type).toEqual('script')

    const transformedSource = transformSource(parsedComponent.script.content)
    const vueComponentPrototype = extractVueComponent(transformedSource, filename)

    cb(vueComponentPrototype)
  })
}

describe('vueComponentPrototypeExtractor', () => {
  describe('BetterCounter', () => {
    const filename = path.join(__dirname, '../example/src/BetterCounter.vue')

    it('should extracts prototype correctly', (done) => {
      readFileAndExtractVueComponent(filename, vueComponentPrototype => {
        expect(vueComponentPrototype.props).toEqual({
          initialCounter: {type: Number, required: true},
          step: {type: Number, default: 1}
        })

        expect(vueComponentPrototype.data()).toEqual({
          counter: undefined // this.initialCounter (a props) is undefined
        })

        expect(vueComponentPrototype.computed.message).not.toBeUndefined()

        expect(vueComponentPrototype.methods.increment).not.toBeUndefined()
        expect(vueComponentPrototype.methods.decrement).not.toBeUndefined()
        expect(vueComponentPrototype.methods.showDialog).not.toBeUndefined()

        done()
      })
    })
  })
})
