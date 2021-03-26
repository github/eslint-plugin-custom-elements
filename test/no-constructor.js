const rule = require('../lib/rules/no-constructor')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
ruleTester.run('no-constructor', rule, {
  valid: [
    {code: 'class SomeMap extends Map { constructor() {} }'},
    {code: 'class FooBarElement { constructor() {} }'},
    {code: 'class FooBarElement extends HTMLElement { connectedCallback() {} }'}
  ],
  invalid: [
    {
      code: 'class FooBarElement extends HTMLElement { constructor() { this.on = true } }',
      errors: [
        {
          message: 'Avoid using constructors in Custom Elements',
          type: 'MethodDefinition'
        }
      ]
    }
  ]
})
