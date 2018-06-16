module.exports = function (template) {
  template = template || 'default'

  switch (true) {
    case template === 'default':
      return 'default'
    case /ink-docstrap\/template/.test(template):
      return 'docstrap'
    case /minami/.test(template):
      return 'minami'
    case /@pixi\/jsdoc-template/.test(template):
      return 'pixi'
    case /tui-jsdoc-template/.test(template):
      return 'tui'
    default:
      console.warn(`The template "${template}" is not recognized by jsdoc-vuejs. Using default template as fallback.`)
      return 'default'
  }
}
