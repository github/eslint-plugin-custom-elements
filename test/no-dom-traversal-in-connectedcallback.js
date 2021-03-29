const rule = require('../lib/rules/no-dom-traversal-in-connectedcallback')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('no-dom-traversal-in-connectedcallback', rule, {
  valid: [
    {code: 'document.querySelector("hello")'},
    {code: 'class FooBar { connectedCallback() { this.querySelector("hello") } }'},
    {code: 'class FooBar extends HTMLElement { update() { this.querySelector("hello") } }'},
    {code: 'document.children'}
  ],
  invalid: [
    {
      code: 'class FooBar extends HTMLElement { connectedCallback() { this.querySelector("hello") } }',
      errors: [
        {
          message: 'DOM traversal using .querySelector inside connectedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { connectedCallback() { document.querySelector("hello") } }',
      errors: [
        {
          message: 'DOM traversal using .querySelector inside connectedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { connectedCallback() { this.foo.querySelector("hello") } }',
      errors: [
        {
          message: 'DOM traversal using .querySelector inside connectedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { connectedCallback() { this.children } }',
      errors: [
        {
          message: 'DOM traversal using .children inside connectedCallback() is error prone.',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { connectedCallback() { this.children = [1] } }',
      errors: [
        {
          message: 'DOM traversal using .children inside connectedCallback() is error prone.',
          type: 'MemberExpression'
        }
      ]
    }
  ]
})
