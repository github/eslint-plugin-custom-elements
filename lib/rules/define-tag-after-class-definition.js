const s = require('../custom-selectors')
const ClassRefTracker = require('../class-ref-tracker')
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    const classes = ClassRefTracker.customElements(context)
    return {
      [s.HTMLElementClass](node) {
        classes.add(node)
      },
      [s.customElements.define](node) {
        if (node.arguments[1].type === 'ClassExpression') {
          context.report(node.arguments[1], 'Inlining Custom Element definition prevents it being used in the file')
        }
        classes.delete(node.arguments[1])
      },
      ['Program:exit']: function () {
        for (const classDef of classes) {
          context.report(classDef, 'Custom Element has not been registered with `define`')
        }
      },
    }
  },
}
