const s = require('../custom-selectors')
const ClassRefTracker = require('../class-ref-tracker')
const {builtInTagMap} = require('../tag-names')

function getExtendsOption(node) {
  if (!node) return null
  if (node.type !== 'ObjectExpression') return null
  const extendsOption = node.properties.find(p => p.key.name === 'extends')
  if (!extendsOption) return null
  const value = extendsOption.value
  if (value.type === 'Literal') return value.value
  if (value.type === 'TemplateLiteral' && value.expressions.length === 0) {
    return value.quasis.map(q => q.value.raw).join('')
  }
  return null
}

/**
 * Format the array of allowed super names for a given class
 * into a string for reporting.
 *
 * @param {Array<string>} allowedSuperNames
 * @example
 * formatNames(['HTMLElement']) // 'HTMLElement'
 * formatNames(['HTMLElement', 'CustomElement']) // HTMLElement or CustomElement
 */
const formatter = new Intl.ListFormat('en', {style: 'short', type: 'disjunction'})
function formatNames(allowedSuperNames) {
  return formatter.format(allowedSuperNames)
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [
    {
      type: 'object',
      properties: {
        allowedSuperNames: {type: 'array', items: {type: 'string'}},
      },
    },
  ],
  create(context) {
    const classes = new ClassRefTracker(context)
    return {
      [s.HTMLElementClass](node) {
        classes.add(node)
      },
      [s.customElements.define](node) {
        const classRef = classes.get(node.arguments[1])
        if (!classRef) return
        if (classRef.type === 'ImportDefaultSpecifier' || classRef.type === 'ImportSpecifier') return
        const extendsTag = getExtendsOption(node.arguments[2])

        // Allowed super names is an array of allowed names.
        let allowedSuperNames
        if (builtInTagMap[extendsTag]) {
          allowedSuperNames = new Set([builtInTagMap[extendsTag]])
        } else {
          allowedSuperNames = new Set((context.options[0] || {}).allowedSuperNames || [])
          allowedSuperNames.add('HTMLElement')
        }

        const formattedNames = formatNames(allowedSuperNames)
        if (!classRef.superClass) {
          return context.report(node.arguments[1], `Custom Element must extend ${formattedNames}`)
        }
        const superName = classRef.superClass.name
        if (!allowedSuperNames.has(superName)) {
          const expectedTag = Object.entries(builtInTagMap).find(e => e[1] === superName)?.[0] || null
          if (extendsTag && !expectedTag) {
            context.report(node, `${superName} !== ${formattedNames}`)
          } else if (!extendsTag && expectedTag) {
            context.report(
              node,
              `Custom Element must extend ${formattedNames}, or pass {extends:'${expectedTag}'} as a third argument to define`
            )
          } else if (extendsTag !== expectedTag) {
            context.report(
              node,
              `Custom Element extends ${superName} but the definition includes {extends:'${extendsTag}'}. ` +
                `Either the Custom Element must extend from ${formattedNames}, ` +
                `or the definition must include {extends:'${expectedTag}'}.`
            )
          } else {
            context.report(node, `Custom Element must extend ${formattedNames} not ${superName}`)
          }
        }
      },
    }
  },
}
