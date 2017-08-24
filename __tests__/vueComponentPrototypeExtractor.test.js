const path = require('path');
const fs = require('fs');
const vueCompiler = require('vue-template-compiler');

const transformSource = require('../lib/sourceTransformer');
const extractVueComponent = require('../lib/vueComponentPrototypeExtractor');

describe('vueComponentPrototypeExtractor', () => {
  const filename = path.join(__dirname, '../example/src/BetterCounter.vue');

  it('should extracts correctly', (done) => {
    fs.readFile(filename, 'utf8', (err, content) => {
      expect(err).toBeNull();

      const parsedComponent = vueCompiler.parseComponent(content);

      expect(parsedComponent.script).not.toBeNull();
      expect(parsedComponent.script.type).toEqual('script');

      const transformedSource = transformSource(parsedComponent.script.content);
      const vueComponentPrototype = extractVueComponent(transformedSource, filename);

      expect(vueComponentPrototype.props).toEqual({
        initialCounter: {type: Number, required: true},
        step: {type: Number, default: 1}
      });

      expect(typeof vueComponentPrototype.data).toBe('function');
      expect(typeof vueComponentPrototype.computed).toBe('object');
      expect(typeof vueComponentPrototype.methods).toBe('object');

      done();
    });
  });
});