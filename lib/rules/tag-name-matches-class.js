const s = require('../custom-selectors')
const transformFuncs = require('../name-transforms')

function formatList(list) {
  return list
    .map((item, index, array) => {
      if (index === array.length - 2) return `"${item}" or `
      if (index === array.length - 1) return `"${item}"`
      return `"${item}", `
    })
    .join('')
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)}
  },
  schema: [
    {
      type: 'object',
      properties: {
        suffix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}]
        },
        prefix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}]
        }
      }
    }
  ],
  create(context) {
    return {
      [s.customElements.define](node) {
        let {suffix: suffixes, prefix: prefixes} = context.options[0] || {}
        suffixes = [].concat(suffixes || [])
        prefixes = [].concat(prefixes || [])

        const tagName = node.arguments[0].value
        const className = node.arguments[1].name

        const tagNameSuggestions = [transformFuncs.kebab(className)]
        for (const name of transformFuncs.generateNames(prefixes, suffixes, className)) {
          tagNameSuggestions.push(transformFuncs.kebab(name))
        }

        const tagNameMatchesSuggestions = tagNameSuggestions.some(suggestion => suggestion === tagName)
        if (!tagNameMatchesSuggestions) {
          context.report(
            node.arguments[0],
            `Custom Element tag name should have been ${formatList(tagNameSuggestions)} but was "${tagName}"`
          )
        }
      }
    }
  }
}
