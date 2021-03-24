class ClassRefTracker {
  constructor(context) {
    this.context = context
    this.classes = new Set()
    this.assignments = new Map()
  }

  add(node) {
    if (node.type === 'ClassExpression') {
      if (node.parent.type === 'AssignmentExpression') {
        const expr = node.parent.left
        this.assignments.set(this.context.getSourceCode().getText(expr), node)
      } else if (node.parent.type === 'VariableDeclarator') {
        this.assignments.set(node.parent.id.name, node)
      }
    }
    this.classes.add(node)
  }

  get(node) {
    if (node.type === 'ClassExpression' || node.type === 'ClassDeclaration') {
      this.classes.add(node)
      return node
    }
    const name = this.context.getSourceCode().getText(node)
    if (this.assignments.has(name)) {
      return this.assignments.get(name)
    } else {
      const classVar = this.context.getScope().set.get(name)
      if (classVar && classVar.defs.length === 1) {
        return classVar.defs[0].node
      }
    }
  }

  delete(node) {
    const classBody = this.get(node)
    return this.classes.delete(classBody)
  }

  [Symbol.iterator]() {
    return this.classes[Symbol.iterator]()
  }
}

module.exports = ClassRefTracker
