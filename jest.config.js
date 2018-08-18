module.exports = {
  bail: true,
  verbose: !process.env.CI,
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: [
    'lib/core/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/__tests__/stubs',
    '/cypress/',
  ],
  moduleNameMapper: {
    'jsdoc/(.*)': '<rootDir>/__tests__/stubs/jsdoc/$1.js',
  },
};
