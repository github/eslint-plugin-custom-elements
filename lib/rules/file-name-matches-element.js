const s = require('../custom-selectors')
const {basename, dirname, extname} = require('path')
const transformFuncs = require('../name-transforms')

function hasFileName(context) {
  const file = context.getFilename()
  return !(file === '<input>' || file === '<text>')
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
    docs: {description: '', url: require('../url')(module)},
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
              maxItems: 4,
            },
          ],
        },
        suffix: {
          onfOf: [{type: 'string'}, {type: 'array', items: {type: 'string'}}],
        },
        matchDirectory: {
          type: 'boolean',
        },
      },
    },
  ],
  create(context) {
    if (!hasFileName(context)) return {}
    return {
      [s.HTMLElementClass](node) {
        const name = node.id?.name
        const names = []
        if (name) {
          names.push(name)
        }
        const filename = basename(context.getFilename(), extname(context.getFilename()))
        const transforms = [].concat(context.options?.[0]?.transform || ['kebab', 'pascal'])
        const suffixes = [].concat(context.options?.[0]?.suffix || [])
        const prefixes = [].concat(context.options?.[0]?.prefix || [])
        if (context.options?.[0]?.matchDirectory) {
          prefixes.push(...expandDirectoryNames(dirname(context.getFilename())))
        }
        for (const newName of transformFuncs.generateNames(prefixes, suffixes, name)) {
          names.push(newName)
        }
        const allowedFileNames = new Set()
        for (const className of names) {
          for (const transform of transforms) {
            allowedFileNames.add(transformFuncs[transform](className))
          }
        }
        if (allowedFileNames.size && !allowedFileNames.has(filename)) {
          const allowed = Array.from(allowedFileNames).join('" or "')
          context.report(node, `File name should be "${allowed}" but was "${filename}"`)
        }
      },
    }
  },
}
