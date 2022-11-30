const s = require('../custom-selectors')
const {builtInTagMap} = require('../tag-names')

module.exports = {
  meta: {
    type: 'problem',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    return {
      [s.HTMLElementClass](node) {
        if (
          node.superClass &&
          node.superClass.name !== 'HTMLElement' &&
          Object.values(builtInTagMap).includes(node.superClass.name)
        ) {
          context.report(node, 'Avoid extending built-in elements')
        }
      },
    }
  },
}
