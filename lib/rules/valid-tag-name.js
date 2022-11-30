const s = require('../custom-selectors')
const {validTagName, reservedTags, knownNamespaces} = require('../tag-names')
module.exports = {
  meta: {
    type: 'problem',
    docs: {description: '', url: require('../url')(module)},
  },
  schema: [
    {
      type: 'object',
      properties: {
        disallowNamespaces: {type: 'boolean'},
        onlyAlphanum: {type: 'boolean'},
        prefix: {
          oneOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}],
        },
        suffix: {
          oneOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}],
        },
      },
    },
  ],
  create(context) {
    return {
      [s.customElements.define](node) {
        const nameArg = node.arguments[0]
        let name = nameArg.value
        if (!['Literal', 'TemplateLiteral'].includes(nameArg.type)) {
          context.report(nameArg, 'Expected custom element name to be a string literal')
          return
        }
        if (nameArg.type === 'TemplateLiteral') {
          // Give up on TemplateLiteral expressions
          if (nameArg.expressions.length) return
          name = nameArg.quasis.map(q => q.value.raw).join('')
        }
        const {disallowNamespaces, onlyAlphanum} = context.options[0] || {}
        let {prefix, suffix} = context.options[0] || {}
        suffix = [].concat(suffix || [])
        prefix = [].concat(prefix || [])
        const namespace = (name.match(/^(.*)-/) || [])[1]
        if (!validTagName(name)) {
          const hints = []
          if (!/^[a-z]/.test(name)) hints.push('Custom Element names must start with a letter')
          if (!/-/.test(name)) hints.push('Custom Element names must contain at least one dash (-)')
          if (/[A-Z]/.test(name)) hints.push('Custom Element names must not contain capital letters')
          context.report(
            nameArg,
            `${name} is not a valid custom element name${hints.length ? '\n' : ''}${hints.join('\n')}`
          )
        }
        if (reservedTags.has(name)) {
          context.report(nameArg, `Custom Elements cannot be given the reserved name "${name}"`)
        }
        if (onlyAlphanum && !/^[a-z0-9-]+$/.test(name)) {
          context.report(nameArg, `Non ASCII Custom Elements have been disallowed`)
        }
        if (disallowNamespaces && knownNamespaces.has(namespace) && !prefix.includes(namespace)) {
          context.report(nameArg, `${namespace} is a common namespace, and has been disallowed`)
        }
        if (suffix.length && !suffix.some(end => name.endsWith(end))) {
          context.report(nameArg, `Custom Element name must end with a suffix: ${suffix}`)
        }
        if (prefix.length && !prefix.some(start => name.startsWith(start))) {
          context.report(nameArg, `Custom Element name must begin with a prefix: ${prefix}`)
        }
      },
    }
  },
}
