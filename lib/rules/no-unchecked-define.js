const s = require('../custom-selectors')

let definedCustomElements = new Map()

module.exports = {
  meta: {
    type: 'layout',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    definedCustomElements = new Map()
    return {
      [`IfStatement:matches([test.type=UnaryExpression],[test.type=BinaryExpression],[test.type=LogicalExpression]) ${s.customElements.get}`](
        node
      ) {
        if (node.parent.type === 'UnaryExpression') {
          let unaryCounter = 0
          let parent = node.parent
          while (parent.type === 'UnaryExpression') {
            unaryCounter++
            parent = parent.parent
          }
          if (unaryCounter % 2 !== 0) {
            definedCustomElements.set(node.arguments[0].value, node)
          }
        } else if (node.parent.type === 'LogicalExpression') {
          // Don't do anything. If the parent is a logical expression, we are
          // checking for truthiness and we only care about if the element is
          // _not_ defined.
        } else {
          definedCustomElements.set(node.arguments[0].value, node)
        }
      },
      [s.customElements.define](node) {
        const inTryCatch =
          node.parent &&
          node.parent.type === 'ExpressionStatement' &&
          node.parent.parent &&
          node.parent.parent.type === 'BlockStatement' &&
          node.parent.parent.parent &&
          node.parent.parent.parent.type === 'TryStatement'
        if (definedCustomElements.has(node.arguments[0].value)) {
          definedCustomElements.delete(node.arguments[0].value)
        } else if (!inTryCatch) {
          context.report(
            node,
            'Make sure to wrap customElements.define calls in checks to see if the element has already been defined'
          )
        }
      },
    }
  },
}
