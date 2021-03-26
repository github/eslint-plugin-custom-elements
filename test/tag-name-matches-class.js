const rule = require('../lib/rules/tag-name-matches-class')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
ruleTester.run('tag-name-matches-class', rule, {
  valid: [
    {code: "customElements.define('foo-bar', FooBar)"},
    {code: "customElements.define('foo-bar-element', FooBarElement)"},

    {code: "customElements.define('foo-bar', FooBar)", options: [{suffix: ['Element']}]},
    {code: "customElements.define('foo-bar', FooBarElement)", options: [{suffix: ['Element']}]},

    {code: "customElements.define('foo-bar', FooBarElement)", options: [{suffix: ['Element']}]},
    {code: "customElements.define('foo-bar', FooBarComponent)", options: [{suffix: 'Component'}]},
    {code: "customElements.define('foo-bar', FooBarElement)", options: [{suffix: ['Element', 'Component']}]},
    {code: "customElements.define('foo-bar', FooBarComponent)", options: [{suffix: ['Element', 'Component']}]}
  ],
  invalid: [
    {
      code: "customElements.define('foo-bar', FooBarElement)",
      errors: [
        {
          message: 'Custom Element tag name should have been "foo-bar-element" but was "foo-bar"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar-element', FooBar)",
      errors: [
        {
          message: 'Custom Element tag name should have been "foo-bar" but was "foo-bar-element"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar', FooBarElement)",
      options: [{suffix: ['Component']}],
      errors: [
        {
          message: 'Custom Element tag name should have been "foo-bar-element" but was "foo-bar"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar', FooBarBaz)",
      options: [{suffix: ['Component', 'Element']}],
      errors: [
        {
          message: 'Custom Element tag name should have been "foo-bar-baz" but was "foo-bar"',
          type: 'Literal'
        }
      ]
    }
  ]
})
