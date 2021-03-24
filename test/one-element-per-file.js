const rule = require('../lib/rules/one-element-per-file')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('one-element-per-file', rule, {
  valid: [
    {
      code: 'class FooBarElement extends HTMLElement {}'
    },
    {
      code: 'class SomeMap extends Map {}\nclass FooBarElement extends HTMLElement {}'
    }
  ],
  invalid: [
    {
      code: 'class FooBarElement extends HTMLElement {}\nclass BarFooElement extends HTMLElement {}',
      errors: [
        {
          message: 'Only one Custom Element should be specified per file',
          type: 'ClassDeclaration',
          line: 2
        }
      ]
    }
  ]
})
