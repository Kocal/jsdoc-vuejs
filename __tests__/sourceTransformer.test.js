const transformSource = require('../lib/sourceTransformer');

describe('source transformer', () => {

  it('should transform source correctly', () => {
    const source = `class Foo {}`;
    const transformedSource = transformSource(source);
    const transformedCode = transformedSource.code;

    expect(transformedCode).not.toEqual(source);
    expect(transformedCode).toContain('var Foo = function'); // ES5
  });
});