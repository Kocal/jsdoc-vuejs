const extractors = require("../lib/extractors");

const BetterCounter = require('../example/src/BetterCounter.vue');
const EmptyComponent = require('./fixtures/EmptyComponent.vue');

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

  describe('empty props', () => {
    it('should be extracted correctly', () => {
      const props = extractors.extractProps(EmptyComponent);

      expect(props).toEqual([]);
    })
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

  describe('empty computed', () => {
    it('should be extracted correctly', () => {
      const computed = extractors.extractComputed(EmptyComponent);

      expect(computed).toEqual([]);
    })
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

  describe('empty data', () => {
    it('should be extracted correctly', () => {
      const data = extractors.extractData(EmptyComponent);

      expect(data).toEqual([]);
    })
  });
});