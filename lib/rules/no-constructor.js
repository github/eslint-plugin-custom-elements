const s = require('../custom-selectors')
const url = new URL(require('../../package.json').homepage)
url.pathname += '/blob/main/docs/rules/no-constructor.md'
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [],
  create(context) {
    return {
      [`${s.HTMLElementClass} MethodDefinition[key.name="constructor"]`](node) {
        context.report(node, 'Avoid using constructors in Custom Elements')
      }
    }
  }
}
