const s = require('../custom-selectors')
const url = new URL(require('../../package.json').homepage)
url.pathname += '/blob/main/docs/rules/no-dom-traversal-in-connectedcallback.md'
const properties = new Set([
  // ParentNode
  'childElementCount',
  'children',
  'firstElementChild',
  'lastElementChild',

  // Node
  'childNodes',
  'firstChild',
  'lastChild'
])
const methods = new Set([
  // ParentNode
  'querySelector',
  'querySelectorAll',

  // Node
  'contains',
  'hasChildNodes',
  'insertBefore',
  'removeChild',
  'replaceChild'
])
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [],
  create(context) {
    return {
      [`${s.HTMLElementClass} MethodDefinition[key.name="connectedcallback"] MemberExpression`](node) {
        const name = node.property.name
        if (node.parent.type === 'CallExpression' && node.parent.callee === node && methods.has(name)) {
          context.report(node.parent, `DOM traversal using .${name} inside connectedCallback() is error prone.`)
        }
        if (!node.property || properties.has(name)) {
          context.report(node, `DOM traversal using .${name} inside connectedCallback() is error prone.`)
        }
      }
    }
  }
}
