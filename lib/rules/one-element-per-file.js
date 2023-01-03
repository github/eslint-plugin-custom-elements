const s = require('../custom-selectors')
module.exports = {
  meta: {
    type: 'layout',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [],
  create(context) {
    let classCount = 0
    return {
      [s.HTMLElementClass](node) {
        classCount += 1
        if (classCount > 1) {
          context.report(node, 'Only one Custom Element should be specified per file')
        }
      },
    }
  },
}
