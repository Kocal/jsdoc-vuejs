const ejs = require('ejs');
const renderer = require('../../lib/core/renderer');

describe('code.renderer', () => {
  beforeEach(() => {
    ejs.renderFile = jest.fn();
  });

  it('should call ejs render method', () => {
    const cb = () => {};

    renderer('my-template', {
      props: ['props'], data: ['data'], computed: ['computed'], event: ['event'],
    }, cb);

    expect(ejs.renderFile).toHaveBeenCalledTimes(1);
    expect(ejs.renderFile).toHaveBeenCalledWith(
      'my-template',
      {
        props: ['props'],
        data: ['data'],
        computed: ['computed'],
        event: ['event'],
        // an helper function, it should be under keys "utils" or "helpers" btw
        renderType: expect.any(Function),
      },
      cb,
    );
  });
});
