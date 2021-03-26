const rule = require('../lib/rules/tag-name-matches-class')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
ruleTester.run('tag-name-matches-class', rule, {
  valid: [
    {code: "customElements.define('foo-bar', FooBarElement)"},
    {code: "customElements.define('foo-bar', FooBar)", options: [{suffix: []}]},
    {code: "customElements.define('foo-bar-element', FooBarElement)", options: [{suffix: []}]},
    {code: "customElements.define('foo-bar', FooBarComponent)", options: [{suffix: 'Component'}]},
    {code: "customElements.define('foo-bar', FooBarComponent)", options: [{suffix: ['Element', 'Component']}]},
    {code: "customElements.define('foo-bar', FooBarElement)", options: [{suffix: ['Element', 'Component']}]}
  ],
  invalid: [
    {
      code: "customElements.define('foo-bar', BarFoo)",
      errors: [
        {
          message: 'Tag name should have been "bar-foo" but was "foo-bar"',
          type: 'Literal'
        },
        {
          message: 'The custom element class name should have been "BarFooElement" but was "BarFoo"',
          type: 'Identifier'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar', BarFooElement)",
      errors: [
        {
          message: 'Tag name should have been "bar-foo" but was "foo-bar"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar-element', FooBarElement)",
      errors: [
        {
          message: 'Tag name should have been "foo-bar" but was "foo-bar-element"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar-component', FooBarElement)",
      options: [{suffix: ['Element', 'Component']}],
      errors: [
        {
          message: 'Tag name should have been "foo-bar" but was "foo-bar-component"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar-element', FooBar)",
      options: [{suffix: []}],
      errors: [
        {
          message: 'Tag name should have been "foo-bar" but was "foo-bar-element"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar-element', FooBarElem)",
      options: [{suffix: ['Elem']}],
      errors: [
        {
          message: 'Tag name should have been "foo-bar" but was "foo-bar-element"',
          type: 'Literal'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar', FooBar)",
      options: [{suffix: ['Elem']}],
      errors: [
        {
          message: 'The custom element class name should have been "FooBarElem" but was "FooBar"',
          type: 'Identifier'
        }
      ]
    },
    {
      code: "customElements.define('foo-bar', FooBar)",
      options: [{suffix: ['Element', 'Component', 'Elem']}],
      errors: [
        {
          message:
            'The custom element class name should have been "FooBarElement", "FooBarComponent" or "FooBarElem" but was "FooBar"',
          type: 'Identifier'
        }
      ]
    }
  ]
})
