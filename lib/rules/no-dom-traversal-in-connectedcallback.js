const s = require('../custom-selectors')
const dom = require('../dom')
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    return {
      [`${s.HTMLElementClass} MethodDefinition[key.name="connectedCallback"] MemberExpression`](node) {
        if (node.parent.type === 'AssignmentExpression') return

        const scope = context.getScope()
        if (scope.type === 'function') {
          const functionScopeName = scope.block.parent.callee?.name || scope.block.parent.callee?.property?.name
          if (dom.allowedScopes.has(functionScopeName)) return
        }
        const name = node.property.name

        if (node.parent.type === 'CallExpression' && node.parent.callee === node && dom.methods.has(name)) {
          context.report(node.parent, `DOM traversal using .${name} inside connectedCallback() is error prone.`)
        }
        if (!node.property || dom.properties.has(name)) {
          context.report(node, `DOM traversal using .${name} inside connectedCallback() is error prone.`)
        }
      },
    }
  },
}
