const path = require('path')

const docletHandlers = require('./../lib/docletHandlers')

const createJSDocEvent = (filename) => {
  return {
    doclet: {
      meta: {
        filename
      },
      description: ''
    }
  }
}

const createJSDocEventForMethod = (filename) => {
  const event = createJSDocEvent(filename)

  event.doclet.kind = 'function'

  return event
}

describe('docletHandlers', () => {
  describe('BetterCounter', () => {
    const filename = path.join(__dirname, '../example/src/BetterCounter.vue')
    const BetterCounter = require(filename)
    const JSDocEvent = createJSDocEvent(filename)

    describe('handleComputed', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleComputed(JSDocEvent, BetterCounter)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })

    describe('handleData', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleData(JSDocEvent, BetterCounter)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })

    describe('handleMethodsAndHooks', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleMethodsAndHooks(JSDocEvent)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })

    describe('handleProps', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleProps(JSDocEvent, BetterCounter)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })
  })

  describe('EmptyComponent', () => {
    const filename = path.join(__dirname, 'fixtures/EmptyComponent.vue')
    const EmptyComponent = require(filename)
    const JSDocEvent = createJSDocEvent(filename)

    describe('handleComputed', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleComputed(JSDocEvent, EmptyComponent)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })

    describe('handleData', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleData(JSDocEvent, EmptyComponent)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })

    describe('handleMethodsAndHooks', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleMethodsAndHooks(JSDocEvent)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })

    describe('handleProps', () => {
      it('should properly handle event\'s doclet', () => {
        docletHandlers.handleProps(JSDocEvent, EmptyComponent)

        expect(JSDocEvent.doclet.description).toMatchSnapshot()
      })
    })
  })

  describe('methods and hooks', () => {
    // this case should not event exists
    it('should not modify doclet if not vue file', () => {
      const event = createJSDocEventForMethod('foo.bar')
      const finalEvent = createJSDocEventForMethod('foo.bar')

      expect(event).toEqual(finalEvent)
      docletHandlers.handleMethodsAndHooks(finalEvent)
      expect(event).toEqual(finalEvent)
    })

    it('should modify name when it\'s a hook', () => {
      const event = createJSDocEventForMethod('foo.vue')

      event.doclet.name = 'created'
      docletHandlers.handleMethodsAndHooks(event)
      expect(event.doclet.name).toEqual('[Hook] created')
    })

    it('should not modify name when it\'s not a hook', () => {
      const event = createJSDocEventForMethod('foo.vue')

      event.doclet.name = 'not_a_hook'
      docletHandlers.handleMethodsAndHooks(event)
      expect(event.doclet.name).toEqual('not_a_hook')
    })
  })
})
