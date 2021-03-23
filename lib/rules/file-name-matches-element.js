const s = require('../custom-selectors')
const {basename, dirname, extname} = require('path')
const transformFuncs = {
  snake(str) {
    return str
      .replace(/([A-Z]($|[a-z]))/g, '_$1')
      .replace(/^_/g, '')
      .toLowerCase()
  },
  kebab(str) {
    return str
      .replace(/([A-Z]($|[a-z]))/g, '-$1')
      .replace(/^-/g, '')
      .toLowerCase()
  },
  pascal(str) {
    return str.replace(/^./g, c => c.toLowerCase())
  },
  none(str) {
    return str
  }
}

function* generateNames(prefixes, suffixes, name) {
  for (const prefix of prefixes) {
    if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
      const truncated = name.substr(prefix.length)
      yield truncated
      for (const suffix of suffixes) {
        if (truncated.toLowerCase().endsWith(suffix.toLowerCase())) {
          yield truncated.substr(0, truncated.length - suffix.length)
        }
      }
    }
  }
  for (const suffix of suffixes) {
    if (name.toLowerCase().endsWith(suffix.toLowerCase())) {
      const truncated = name.substr(0, name.length - suffix.length)
      yield truncated
      for (const prefix of prefixes) {
        if (truncated.toLowerCase().startsWith(prefix.toLowerCase())) {
          yield truncated.substr(prefix.length)
        }
      }
    }
  }
}

function* expandDirectoryNames(path) {
  const dirs = path.toLowerCase().split(/[/\\]/g)
  while (dirs.length) {
    yield dirs.join('')
    dirs.shift()
  }
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
        transform: {
          oneOf: [
            {enum: ['none', 'snake', 'kebab', 'pascal']},
            {
              type: 'array',
              items: {enum: ['none', 'snake', 'kebab', 'pascal']},
              minItems: 1,
              maxItems: 4
            }
          ]
        },
        suffix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}]
        },
        matchDirectory: {
          type: 'boolean'
        }
      }
    }
  ],
  create(context) {
    return {
      [s.HTMLElementClass](node) {
        const name = node.id.name
        const names = [name]
        const filename = basename(context.getFilename(), extname(context.getFilename()))
        if (filename === '<input>' || filename === '<text>') return
        const transforms = [].concat(context.options?.[0]?.transform || ['kebab', 'pascal'])
        const suffixes = [].concat(context.options?.[0]?.suffix || [])
        const prefixes = [].concat(context.options?.[0]?.prefix || [])
        if (context.options?.[0]?.matchDirectory) {
          prefixes.push(...expandDirectoryNames(dirname(context.getFilename())))
        }
        for (const newName of generateNames(prefixes, suffixes, name)) {
          names.push(newName)
        }
        const allowedFileNames = new Set()
        for (const className of names) {
          for (const transform of transforms) {
            allowedFileNames.add(transformFuncs[transform](className))
          }
        }
        if (!allowedFileNames.has(filename)) {
          const allowed = Array.from(allowedFileNames).join('" or "')
          context.report(node, `File name should be "${allowed}" but was "${filename}"`)
        }
      }
    }
  }
}
