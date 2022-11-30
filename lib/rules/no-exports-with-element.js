const s = require('../custom-selectors')
const ClassRefTracker = require('../class-ref-tracker')

module.exports = {
  meta: {
    type: 'layout',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    const classes = ClassRefTracker.customElements(context)
    const eventClasses = ClassRefTracker.customEvents(context)
    const exports = new Set()
    let hasElement = false

    return {
      [s.HTMLElementClass](node) {
        hasElement = true
        classes.add(node)
      },
      [s.EventSubClass](node) {
        eventClasses.add(node)
      },
      ['ExportNamedDeclaration > VariableDeclaration > VariableDeclarator']: function (node) {
        if (!classes.get(node.init) && !eventClasses.get(node.init)) {
          exports.add(node.init)
        }
      },
      ['ExportNamedDeclaration :matches(ClassDeclaration, ClassExpression, FunctionDeclaration)']: function (node) {
        if (!classes.get(node) && !eventClasses.get(node)) {
          exports.add(node)
        }
      },
      ['ExportNamedDeclaration > AssignmentExpression']: function (node) {
        if (!classes.get(node.right) && !eventClasses.get(node.local)) {
          exports.add(node.right)
        }
      },
      ['ExportNamedDeclaration ExportSpecifier']: function (node) {
        if (!classes.get(node.local) && !eventClasses.get(node.local)) {
          exports.add(node.local)
        }
      },
      ExportDefaultDeclaration(node) {
        let declaration = node.declaration
        if (declaration.type === 'AssignmentExpression') {
          declaration = declaration.right
        }
        if (!classes.get(declaration) && !eventClasses.get(declaration)) {
          exports.add(declaration)
        }
      },
      ['Program:exit']: function () {
        if (!hasElement) return
        for (const node of exports) {
          context.report(node, 'Do not export non-custom elements along custom elements')
        }
      },
    }
  },
}
