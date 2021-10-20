module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020
  },
  env: {
    node: true
  },
  extends: ['plugin:github/recommended'],
  rules: {
    'i18n-text/no-en': 'off',
    'import/no-commonjs': 'off'
  },
  overrides: [
    {
      files: '.eslintrc.js',
      rules: {
        'filenames/match-regex': 'off'
      }
    }
  ]
}
