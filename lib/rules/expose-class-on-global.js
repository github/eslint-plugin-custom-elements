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
      ['AssignmentExpression[left.object.name=window]:exit']: function (node) {
        const classDef = classes.get(node.right)
        classes.delete(classDef)
        if (classDef && (!classDef.id || classDef.id.name !== node.left.property.name)) {
          context.report(node.left.property, 'Custom Element global assignment must match class name')
        }
      },
      ['Program:exit']: function () {
        for (const classDef of classes) {
          context.report(classDef, 'Custom Element has not been exported onto `window`')
        }
      },
    }
  },
}
