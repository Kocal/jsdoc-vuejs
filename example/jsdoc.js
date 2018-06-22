module.exports = {
  plugins: [
    '../',
    'plugins/markdown',
  ],
  source: {
    include: [
      'src/',
      'README.md',
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    encoding: 'utf8',
  },
};
