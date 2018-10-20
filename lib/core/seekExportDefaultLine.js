/* eslint-disable no-continue */

module.exports = function seekExportDefaultLine(source, filename) {
  let inScript = filename ? filename.endsWith('.js') : false;

  // eslint-disable-next-line no-restricted-syntax
  for (const [i, line] of source.split(/\r?\n/).entries()) {
    if (line.trim() === '') {
      continue;
    }

    if (/<script[^>]*>/.test(line)) {
      inScript = true;
    } else if (!inScript && /<\/script>/.test(line)) {
      inScript = false;
    }

    if (inScript && /export\s+default/.test(line)) {
      return i + 1; // index starts at 0, but file's lines start at 1
    }
  }

  return 0;
};
