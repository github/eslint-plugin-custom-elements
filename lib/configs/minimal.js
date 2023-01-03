const rules = require('../rules')
module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es2021: true,
  },
  plugins: ['custom-elements'],
  rules: Object.fromEntries(
    Object.keys(rules)
      .filter(r => rules[r].meta.type === 'problem')
      .map(r => [`custom-elements/${r}`, 'error'])
  ),
}
