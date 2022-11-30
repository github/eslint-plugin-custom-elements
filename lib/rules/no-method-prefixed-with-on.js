const s = require('../custom-selectors')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    return {
      [`${s.HTMLElementClass} MethodDefinition[key.name=/^on.*$/i]`](node) {
        context.report(node, 'Avoid method names prefixed with `on`')
      },
    }
  },
}
