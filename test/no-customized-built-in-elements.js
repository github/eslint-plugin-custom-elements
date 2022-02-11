const rule = require('../lib/rules/no-customized-built-in-elements')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
ruleTester.run('no-customized-built-in-elements', rule, {
  valid: [
    {code: 'class SomeMap extends Map { }'},
    {code: 'class FooBarElement { }'},
    {code: 'class FooBarElement extends HTMLElement { }'},
    {code: 'const FooBarElement = class extends HTMLElement { }'},
    {code: 'const FooBarElement = class extends HTMLRandomNotBuiltInElement { }'}
  ],
  invalid: [
    {
      code: 'class FooBarElement extends HTMLParagraphElement { }',
      errors: [
        {
          message: 'Avoid extending built-in elements',
          type: 'ClassDeclaration'
        }
      ]
    },
    {
      code: 'const FooBarElement = class extends HTMLParagraphElement { }',
      errors: [
        {
          message: 'Avoid extending built-in elements',
          type: 'ClassExpression'
        }
      ]
    }
  ]
})
