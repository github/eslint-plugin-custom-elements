const rule = require('../lib/rules/expose-class-on-global')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('expose-class-on-global', rule, {
  valid: [
    {code: 'class SomeMap extends Map {}'},
    {code: 'class SomeMap extends Map {}\nwindow.Other = SomeMap'},
    {code: 'class FooBar extends HTMLElement {}\nwindow.FooBar = FooBar'},
    {code: 'window.FooBar = class FooBar extends HTMLElement {}'}
  ],
  invalid: [
    {
      code: 'class FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element has not been exported onto `window`',
          type: 'ClassDeclaration'
        }
      ]
    },
    {
      code: 'window.customElements.define("foo-bar", FooBar)\nclass FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element has not been exported onto `window`',
          type: 'ClassDeclaration'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement {}\nwindow.Other = FooBar',
      errors: [
        {
          message: 'Custom Element global assignment must match class name',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'window.Other = class FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element global assignment must match class name',
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'window.Other = class extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element global assignment must match class name',
          type: 'Identifier'
        }
      ]
    }
  ]
})
