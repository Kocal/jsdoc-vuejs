module.exports = {
  plugins: [
    '../',
    'plugins/markdown',
  ],
  source: {
    include: [
      'src/',
      'src/better-components',
      'src/js',
      'README.md',
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    encoding: 'utf8',
  },
};
