const s = require('../custom-selectors')
const {kebab} = require('../name-transforms')

function removePrefixesAndSuffixes(className, prefixes, suffixes) {
  for (const prefix of prefixes) {
    if (className.startsWith(prefix)) {
      className = className.replace(prefix, '')
    }
  }
  for (const suffix of suffixes) {
    if (className.endsWith(suffix)) {
      className = className.replace(suffix, '')
    }
  }
  return className
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [
    {
      type: 'object',
      properties: {
        suffix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}],
        },
        prefix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}],
        },
      },
    },
  ],
  create(context) {
    return {
      [s.customElements.define](node) {
        let {suffix: suffixes, prefix: prefixes} = context.options[0] || {}
        suffixes = [].concat(suffixes || [])
        prefixes = [].concat(prefixes || [])

        const tagName = node.arguments[0].value
        const className = node.arguments[1].name || node.arguments[1].id?.name

        if (!className) {
          return
        }

        const classNameWithoutPrefixesAndSuffixes = removePrefixesAndSuffixes(className, prefixes, suffixes)
        const tagNameSuggestion = kebab(classNameWithoutPrefixesAndSuffixes)
        if (tagName !== tagNameSuggestion) {
          context.report(
            node.arguments[0],
            `Custom Element tag name should have been "${tagNameSuggestion}" but was "${tagName}"`
          )
        }
      },
    }
  },
}
