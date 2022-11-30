const rule = require('../lib/rules/no-method-prefixed-with-on')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
ruleTester.run('no-method-prefixed-with-on', rule, {
  valid: [
    {code: 'class FooBar extends HTMLElement { handleClick() {  } }'},
    {code: 'class FooBar extends HTMLElement { offClick() {  } }'},
    {code: 'class FooBar extends HTMLElement { click() {  } }'},
    {code: 'class FooBar extends HTMLElement { fooOnClick() {  } }'},
    {code: 'class FooBar extends HTMLElement { fooonclick() {  } }'},
    {code: 'class FooBar extends HTMLElement { handleOnClick() {  } }'},
    {code: 'class FooBar extends HTMLElement { handleonclick() {  } }'},
  ],
  invalid: [
    {
      code: 'class FooBar extends HTMLElement { onclick() { } }',
      errors: [
        {
          message: 'Avoid method names prefixed with `on`',
          type: 'MethodDefinition',
        },
      ],
    },
    {
      code: 'class FooBar extends HTMLElement { ontoggle() { } }',
      errors: [
        {
          message: 'Avoid method names prefixed with `on`',
          type: 'MethodDefinition',
        },
      ],
    },
    {
      code: 'class FooBar extends HTMLElement { onload() { } }',
      errors: [
        {
          message: 'Avoid method names prefixed with `on`',
          type: 'MethodDefinition',
        },
      ],
    },
    {
      code: 'class FooBar extends HTMLElement { onClick() { } }',
      errors: [
        {
          message: 'Avoid method names prefixed with `on`',
          type: 'MethodDefinition',
        },
      ],
    },
    {
      code: 'class FooBar extends HTMLElement { oncease() { } }',
      errors: [
        {
          message: 'Avoid method names prefixed with `on`',
          type: 'MethodDefinition',
        },
      ],
    },
  ],
})
