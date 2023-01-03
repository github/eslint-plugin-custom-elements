class ClassRefTracker {
  constructor(context, extendsFrom) {
    this.context = context
    this.classes = new Set()
    this.assignments = new Map()
    this.extendsFrom = extendsFrom || (() => true)
  }

  add(node) {
    if (!this.extendsFrom(node.superClass)) return false
    if (node.type === 'ClassExpression') {
      if (node.parent.type === 'AssignmentExpression') {
        const expr = node.parent.left
        this.assignments.set(this.context.getSourceCode().getText(expr), node)
      } else if (node.parent.type === 'VariableDeclarator') {
        this.assignments.set(node.parent.id.name, node)
      }
    }
    this.classes.add(node)
    return true
  }

  get(node) {
    if (node && (node.type === 'ClassExpression' || node.type === 'ClassDeclaration')) {
      return this.add(node) ? node : null
    }
    const name = this.context.getSourceCode().getText(node)
    if (this.assignments.has(name)) {
      return this.assignments.get(name)
    } else {
      const classVar = this.context.getScope().references.find(reference => reference.identifier.name === name)
      if (classVar && classVar.resolved && classVar.resolved.defs.length === 1) {
        const classDef = classVar.resolved.defs[0].node
        return this.add(classDef) ? classDef : null
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

  static customElements(context) {
    return new ClassRefTracker(context, superClassRef => superClassRef && /^HTML.*Element$/.test(superClassRef.name))
  }

  static customEvents(context) {
    return new ClassRefTracker(context, superClassRef => superClassRef && superClassRef.name === 'Event')
  }
}

module.exports = ClassRefTracker
