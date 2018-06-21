const path = require('path');
const fs = require('fs');
const seekExportDefaultLine = require('../../lib/core/seekExportDefaultLine');

const readComponent = (component, cb) => {
  const filename = path.join(__dirname, `__fixtures__/methods/${component}.vue`);

  fs.readFile(filename, 'utf8', (err, source) => cb(source));
};

describe('core.seekExportDefaultLine', () => {
  test('A normal component', (done) => {
    readComponent('Component', (source) => {
      expect(seekExportDefaultLine(source)).toBe(9);
      done();
    });
  });

  test('A normal component with a lot of spaces', (done) => {
    readComponent('ComponentWithSpaces', (source) => {
      expect(seekExportDefaultLine(source)).toBe(14);
      done();
    });
  });

  test('When <script> is before <template>', (done) => {
    readComponent('ScriptBeforeTemplate', (source) => {
      expect(seekExportDefaultLine(source)).toBe(5);
      done();
    });
  });
  test('When `export default` is inside <template>', (done) => {
    readComponent('ComponentWithExportDefaultInTemplate', (source) => {
      expect(seekExportDefaultLine(source)).toBe(6);
      done();
    });
  });
});
