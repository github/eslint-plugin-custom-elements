module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  extends: ['plugin:github/recommended', 'plugin:eslint-plugin/recommended'],
  rules: {
    'i18n-text/no-en': 'off',
    'import/no-commonjs': 'off',
    'eslint-plugin/require-meta-docs-url': 'error',
  },
  overrides: [
    {
      files: '.eslintrc.js',
      rules: {
        'filenames/match-regex': 'off',
      },
    },
  ],
}
