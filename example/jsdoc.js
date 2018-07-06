module.exports = {
  plugins: [
    '../',
    'plugins/markdown',
  ],
  source: {
    include: [
      'src/',
      'src/better-components',
      'README.md',
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    encoding: 'utf8',
  },
};
