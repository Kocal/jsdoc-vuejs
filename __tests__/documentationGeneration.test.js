const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const docsOutputPath = path.resolve(path.join(__dirname, '../example/docs'))

describe('documentation generation', () => {
  it('documentation should be already generated', (done) => {
    fs.stat(docsOutputPath, (err, stats) => {
      expect(err).toBeNull()
      expect(stats.isDirectory()).toBeTruthy()
      done()
    })
  })

  it('documentation for Counter should not be generated', (done) => {
    const filename = path.join(docsOutputPath, 'Vue_Counter.html')

    fs.stat(filename, (err, stats) => {
      expect(err).not.toBeNull()
      expect(stats).toBeUndefined()

      done()
    })
  })

  describe('BetterCounter documentation generation', () => {
    const filename = path.join(docsOutputPath, 'Vue_BetterCounter.html')

    it('documentation should be generated', (done) => {
      fs.stat(filename, (err, stats) => {
        expect(err).toBeNull()
        expect(stats).not.toBeUndefined()
        expect(stats.isFile()).toBeTruthy()

        done()
      })
    })

    describe('should renders properly', () => {
      const html = fs.readFileSync(filename)
      const $ = cheerio.load(html)

      const $$subsectionsTitle = $('.subsection-title')

      it('subtitles', () => {
        expect($$subsectionsTitle.length).toEqual(4) // props, computed, data, methods
        expect($$subsectionsTitle.eq(0).text()).toEqual('Props')
        expect($$subsectionsTitle.eq(1).text()).toEqual('Computed')
        expect($$subsectionsTitle.eq(2).text()).toEqual('Data')
        expect($$subsectionsTitle.eq(3).text()).toEqual('Methods')
      })

      describe('props', () => {
        const $$props = $$subsectionsTitle.eq(0).next()

        it('table headers', () => {
          const $$headers = $$props.find('thead th')
          const headers = $$headers.map((i, el) => $(el).text()).get()

          expect(headers).toEqual(['Name', 'Type', 'Required', 'Default value'])
        })

        it('1st prop (initialCounter)', () => {
          const $$firstProp = $$props.find('tbody tr').eq(0).find('td')

          expect($$firstProp.eq(0).text()).toEqual('initialCounter')
          expect($$firstProp.eq(1).text()).toEqual('Number')
          expect($$firstProp.eq(2).html()).toEqual('<b>true</b>')
          expect($$firstProp.eq(3).text()).toEqual('')
        })

        it('2nd prop (step)', () => {
          const $$secondProp = $$props.find('tbody tr').eq(1).find('td')

          expect($$secondProp.eq(0).text()).toEqual('step')
          expect($$secondProp.eq(1).text()).toEqual('Number')
          expect($$secondProp.eq(2).html()).toEqual('false')
          expect($$secondProp.eq(3).text()).toEqual('1')
        })
      })

      describe('computed', () => {
        const $$computed = $$subsectionsTitle.eq(1).next()

        it('table headers', () => {
          const $$headers = $$computed.find('thead th')
          const headers = $$headers.map((i, el) => $(el).text()).get()

          expect(headers).toEqual(['Name'])
        })

        it('1st computed (message)', () => {
          const $$firstComputed = $$computed.find('tbody tr').eq(0).find('td')

          expect($$firstComputed.eq(0).text()).toEqual('message')
        })
      })

      describe('data', () => {
        const $$data = $$subsectionsTitle.eq(2).next()

        it('table headers', () => {
          const $$headers = $$data.find('thead th')
          const headers = $$headers.map((i, el) => $(el).text()).get()

          expect(headers).toEqual(['Name'])
        })

        it('1st data (counter)', () => {
          const $$firstData = $$data.find('tbody tr').eq(0).find('td')

          expect($$firstData.eq(0).text()).toEqual('counter')
        })
      })

      describe('methods', () => {
        const $$methodsSubtitle = $$subsectionsTitle.eq(3)

        it('hook should be specially treated', () => {
          const $$hookName = $$methodsSubtitle.next('h4.name')
          const $$hookDescription = $$hookName.next('div.description')

          expect($$hookName.text().trim()).toEqual('[Hook] created()')
          expect($$hookDescription.text().trim()).toEqual('Counter.vue created hook.')
        })

        it('method should not be specially treated', () => {
          const $$methodName = $$methodsSubtitle.nextAll('h4.name').eq(1)
          const $$methodDescription = $$methodName.next('div.description')

          expect($$methodName.text().trim()).toEqual('decrement()')
          expect($$methodDescription.text().trim()).toEqual('Decrement counter.')
        })
      })
    })
  })
})
