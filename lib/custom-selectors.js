const HTMLElementClass = ':matches(ClassDeclaration, ClassExpression)[superClass.name=/HTML.*Element/]'
const EventSubClass = ':matches(ClassDeclaration, ClassExpression)[superClass.name=/^Event$/]'
const customElements = {
  _call:
    '[callee.object.type=Identifier][callee.object.name=customElements],' +
    '[callee.object.type=MemberExpression][callee.object.property.name=customElements]',
}
customElements.get = `CallExpression[callee.property.name=get]:matches(${customElements._call}):exit`
customElements.define = `CallExpression[callee.property.name=define]:matches(${customElements._call}):exit`

module.exports = {
  HTMLElementClass,
  customElements,
  EventSubClass,
}
