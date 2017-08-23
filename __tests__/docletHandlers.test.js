const path = require('path');

const docletHandlers = require('./../lib/docletHandlers');
const BetterCounter = require('./../example/src/BetterCounter.vue');

const JSDocEvent = {
  doclet: {
    meta: {
      filename: path.join(__dirname, '../example/src/BetterCounter.vue')
    },
    description: ''
  }
};

describe('handleComputed', () => {
  it('should properly handle event\'s doclet', () => {
    docletHandlers.handleComputed(JSDocEvent, BetterCounter);

    expect(JSDocEvent.doclet.description).toMatchSnapshot();
  })
});

describe('handleData', () => {
  it('should properly handle event\'s doclet', () => {
    docletHandlers.handleData(JSDocEvent, BetterCounter);

    expect(JSDocEvent.doclet.description).toMatchSnapshot();
  })
});

describe('handleMethodsAndHooks', () => {
  it('should properly handle event\'s doclet', () => {
    docletHandlers.handleMethodsAndHooks(JSDocEvent, BetterCounter);

    expect(JSDocEvent.doclet.description).toMatchSnapshot();
  })
});

describe('handleProps', () => {
  it('should properly handle event\'s doclet', () => {
    docletHandlers.handleProps(JSDocEvent, BetterCounter);

    expect(JSDocEvent.doclet.description).toMatchSnapshot();
  })
});
