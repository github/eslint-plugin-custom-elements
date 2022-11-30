const s = require('../custom-selectors')
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    return {
      [`${s.HTMLElementClass} MethodDefinition[key.name="constructor"]`](node) {
        context.report(node, 'Avoid using constructors in Custom Elements')
      },
    }
  },
}
