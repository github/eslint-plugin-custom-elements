module.exports = {
  'define-tag-after-class-definition': require('./rules/define-tag-after-class-definition'),
  'expose-class-on-global': require('./rules/expose-class-on-global'),
  'extends-correct-class': require('./rules/extends-correct-class'),
  'file-name-matches-element': require('./rules/file-name-matches-element'),
  'no-constructor': require('./rules/no-constructor'),
  'no-customized-built-in-elements': require('./rules/no-customized-built-in-elements'),
  'no-dom-traversal-in-connectedcallback': require('./rules/no-dom-traversal-in-connectedcallback'),
  'one-element-per-file': require('./rules/one-element-per-file'),
  'tag-name-matches-class': require('./rules/tag-name-matches-class'),
  'valid-tag-name': require('./rules/valid-tag-name')
}
