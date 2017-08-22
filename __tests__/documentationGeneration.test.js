const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docsOutputPath = path.resolve(path.join(__dirname, '../example/docs'));

const Counter = require('../example/src/Counter.vue');
const BetterCounter = require('../example/src/BetterCounter.vue');

describe('documentation generation', () => {

  it('documentation should be already generated', (done) => {
    fs.stat(docsOutputPath, (err, stats) => {
      expect(err).toBeNull();
      expect(stats.isDirectory()).toBeTruthy();
      done();
    });
  });

  it('documentation for Counter should not be generated', (done) => {
    const filename = path.join(docsOutputPath, 'module-(Vue)%20Counter.html');

    fs.stat(filename, (err, stats) => {
      expect(err).not.toBeNull();
      expect(stats).toBeUndefined();

      done();
    });
  });

  describe('test BetterCounter documentation generation', () => {
    const filename = path.join(docsOutputPath, 'module-(Vue)%20BetterCounter.html');

    it('documentation for BetterCounter should be generated', (done) => {
      fs.stat(filename, (err, stats) => {
        expect(err).toBeNull();
        expect(stats).not.toBeUndefined();
        expect(stats.isFile()).toBeTruthy();

        done();
      });
    });

    describe('should renders properly', () => {
      const html = fs.readFileSync(filename);
      const $ = cheerio.load(html);

      const $$subsectionsTitle = $('.subsection-title');

      it('test subtitles', () => {
        expect($$subsectionsTitle.length).toEqual(4); // props, computed, data, methods
        expect($$subsectionsTitle.eq(0).text()).toEqual('Props');
        expect($$subsectionsTitle.eq(1).text()).toEqual('Computed');
        expect($$subsectionsTitle.eq(2).text()).toEqual('Data');
        expect($$subsectionsTitle.eq(3).text()).toEqual('Methods');
      });
    });
  })
});