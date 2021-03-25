const s = require('../custom-selectors')
module.exports = {
  meta: {
    type: 'problem',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [],
  create(context) {
    return {
      [s.HTMLElementClass](node) {
        if (node.superClass && node.superClass.name !== 'HTMLElement') {
          context.report(node, 'Avoid extending built-in elements')
        }
      }
    }
  }
}
