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
    '/cypress/',
  ],
};
