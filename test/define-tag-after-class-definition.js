const rule = require('../lib/rules/define-tag-after-class-definition')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('define-tag-after-class-definition', rule, {
  valid: [
    {code: 'class SomeMap extends Map {}'},
    {code: 'class FooBar extends HTMLElement {}\ncustomElements.define("foo-bar", FooBar)'},
    {code: 'class FooBar extends HTMLElement {}\nwindow.customElements.define("foo-bar", FooBar)'},
    {code: 'window.FooBar = class FooBar extends HTMLElement {}\ncustomElements.define("foo-bar", window.FooBar)'},
    {code: 'class FooBar extends HTMLDivElement {}\nwindow.customElements.define("foo-bar", FooBar, {is:"div"})'},
    {code: 'const FooBar = class FooBar extends HTMLElement {}\ncustomElements.define("foo-bar", FooBar)'}
  ],
  invalid: [
    {
      code: 'class FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element has not been registered with `define`',
          type: 'ClassDeclaration'
        }
      ]
    },
    {
      code: 'window.customElements.define("foo-bar", FooBar)\nclass FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element has not been registered with `define`',
          type: 'ClassDeclaration'
        }
      ]
    },
    {
      code: 'window.customElements.define("foo-bar", class extends HTMLElement {})',
      errors: [
        {
          message: 'Custom Element has not been registered with `define`',
          type: 'ClassExpression'
        }
      ]
    },
    {
      code: 'const FooBar = class FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element has not been registered with `define`',
          type: 'ClassExpression'
        }
      ]
    },
    {
      code: 'window.FooBar = class FooBar extends HTMLElement {}',
      errors: [
        {
          message: 'Custom Element has not been registered with `define`',
          type: 'ClassExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLDivElement {}',
      errors: [
        {
          message: 'Custom Element has not been registered with `define`',
          type: 'ClassDeclaration'
        }
      ]
    }
  ]
})
