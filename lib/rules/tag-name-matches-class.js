const s = require('../custom-selectors')
const transformFuncs = require('../name-transforms')

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
        }
      }
    }
  ],
  create(context) {
    return {
      [s.customElements.define](node) {
        let {suffix: suffixes} = context.options[0] || {suffix: ['Element']}
        suffixes = [].concat(suffixes || [])

        const tagName = node.arguments[0].value
        const className = node.arguments[1].name
        const classNameWithoutSuffix = className.replace(new RegExp(suffixes.join('|')), '')

        if (suffixes && suffixes.length > 0 && !suffixes.some(suffix => className.includes(suffix))) {
          const possibleClassNames = suffixes
            .map(suffix => `"${className}${suffix}"`)
            .map((possibleClassName, index, array) => {
              if (index === array.length - 2) return `${possibleClassName} or `
              if (index === array.length - 1) return `${possibleClassName}`
              return `${possibleClassName}, `
            })
            .join('')
          context.report(
            node.arguments[1],
            `The custom element class name should have been ${possibleClassNames} but was "${className}"`
          )
        }

        const tagNameSuggestion = transformFuncs.kebab(classNameWithoutSuffix)
        if (tagNameSuggestion !== tagName) {
          context.report(node.arguments[0], `Tag name should have been "${tagNameSuggestion}" but was "${tagName}"`)
        }
      }
    }
  }
}
