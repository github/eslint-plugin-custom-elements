const s = require('../custom-selectors')
const ClassRefTracker = require('../class-ref-tracker')

module.exports = {
  meta: {
    type: 'layout',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [],
  create(context) {
    const classes = ClassRefTracker.customElements(context)
    const exports = new Set()
    let hasElement = false

    return {
      [s.HTMLElementClass](node) {
        hasElement = true
        classes.add(node)
      },
      ['ExportNamedDeclaration VariableDeclarator']: function (node) {
        if (!classes.get(node.init)) {
          exports.add(node.init)
        }
      },
      ['ExportNamedDeclaration :matches(ClassDeclaration, ClassExpression, FunctionDeclaration)']: function (node) {
        if (!classes.get(node)) {
          exports.add(node)
        }
      },
      ['ExportNamedDeclaration AssignmentExpression']: function (node) {
        if (!classes.get(node.right)) {
          exports.add(node.right)
        }
      },
      ['ExportNamedDeclaration ExportSpecifier']: function (node) {
        if (!classes.get(node.local)) {
          exports.add(node.local)
        }
      },
      ExportDefaultDeclaration(node) {
        let declaration = node.declaration
        if (declaration.type === 'AssignmentExpression') {
          declaration = declaration.right
        }
        if (!classes.get(declaration)) {
          exports.add(declaration)
        }
      },
      ['Program:exit']: function () {
        if (!hasElement) return
        for (const node of exports) {
          context.report(node, 'Do not export non-custom elements along custom elements')
        }
      }
    }
  }
}
