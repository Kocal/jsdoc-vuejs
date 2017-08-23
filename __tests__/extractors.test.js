const BetterCounter = require('../example/src/BetterCounter.vue');
const extractors = require("../lib/extractors");

describe('extractors', () => {
  describe('props', () => {
    const props = extractors.extractProps(BetterCounter);

    it('should be extracted correctly', () => {
      expect(props).toEqual([
        {
          name: 'initialCounter',
          type: 'Number',
          required: '<b>true</b>',
          default: ''
        }, {
          name: 'step',
          type: 'Number',
          required: 'false',
          default: 1
        }
      ]);
    });
  });

  describe('computed', () => {
    const computed = extractors.extractComputed(BetterCounter);

    it('should be extracted correctly', () => {
      expect(computed).toEqual([
        {
          name: 'message'
        }
      ]);
    });
  });

  describe('data', () => {
    const data = extractors.extractData(BetterCounter);

    it('should be extracted correctly', () => {

      expect(data).toEqual([
        {
          name: 'counter'
        }
      ]);
    });
  });
});