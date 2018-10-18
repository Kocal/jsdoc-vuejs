const path = require('path');
const fs = require('fs');
const seekExportDefaultLine = require('../../lib/core/seekExportDefaultLine');

const readComponent = (componentPath, cb) => {
  const filename = path.join(__dirname, `__fixtures__/methods/${componentPath}`);

  fs.readFile(filename, 'utf8', (err, source) => cb(source));
};

describe('core.seekExportDefaultLine', () => {
  test('A normal component', (done) => {
    readComponent('Component.vue', (source) => {
      expect(seekExportDefaultLine(source)).toBe(9);
      done();
    });
  });

  test('A normal component with a lot of spaces', (done) => {
    readComponent('ComponentWithSpaces.vue', (source) => {
      expect(seekExportDefaultLine(source)).toBe(14);
      done();
    });
  });

  test('When <script> is before <template>', (done) => {
    readComponent('ScriptBeforeTemplate.vue', (source) => {
      expect(seekExportDefaultLine(source)).toBe(5);
      done();
    });
  });
  test('When `export default` is inside <template>', (done) => {
    readComponent('ComponentWithExportDefaultInTemplate.vue', (source) => {
      expect(seekExportDefaultLine(source)).toBe(6);
      done();
    });
  });
  test('When component is js file', (done) => {
    readComponent('Component/Component.js', (source) => {
      expect(seekExportDefaultLine(source, 'Component.js')).toBe(6);
      done();
    });
  });
});
