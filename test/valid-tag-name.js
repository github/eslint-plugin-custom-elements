const rule = require('../lib/rules/valid-tag-name')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('valid-tag-name', rule, {
  valid: [
    {code: 'customElements.define("foo-bar")'},
    {code: "customElements.define('foo-bar')"},
    {code: 'customElements.define(`foo-bar`)'},
    {code: 'customElements.define("foo-bar")'},
    {code: 'customElements.define("m---···---")'},
    {code: 'customElements.define("aÀ-")'},
    {code: 'customElements.define("leiðinlegt-tíst")'},
    {code: 'customElements.define("a-😶‍🌫️")'},
    {code: 'customElements.define("notice-©")'},
    {code: 'customElements.define("a-b-c-")', options: [{onlyAlphanum: true}]},
    {code: 'customElements.define("foo-bar")', options: [{disallowNamespaces: true}]},
    {code: 'customElements.define("ng-bar")', options: [{disallowNamespaces: true, prefix: 'ng'}]}
  ],
  invalid: [
    {
      code: 'customElements.define("foo")',
      errors: [
        {
          message: 'Custom Element names must contain at least one dash (-)',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("-foo-bar")',
      errors: [
        {
          message: 'Custom Element names must not start with a dash (-)',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("foo-BAR")',
      errors: [
        {
          message: 'Custom Element names must not contain capital letters',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("<an-element>")',
      errors: [
        {
          message: 'Custom Element names must not include the tag syntax (<>)',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("911-emergency")',
      errors: [
        {
          message: 'Custom Element names must start with a letter',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("annotation-xml")',
      errors: [
        {
          message: 'Custom Elements cannot be given the reserved name "annotation-xml"',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("a-😶‍🌫️")',
      options: [
        {
          onlyAlphanum: true
        }
      ],
      errors: [
        {
          message: 'Non ASCII Custom Elements have been disallowed',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("a-😶‍🌫️")',
      options: [
        {
          onlyAlphanum: true
        }
      ],
      errors: [
        {
          message: 'Non ASCII Custom Elements have been disallowed',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("ng-element")',
      options: [
        {
          disallowNamespaces: true
        }
      ],
      errors: [
        {
          message: 'ng is a common namespace, and has been disallowed',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("abc-element")',
      options: [
        {
          prefix: 'foo'
        }
      ],
      errors: [
        {
          message: 'Custom Element name must begin with a prefix: foo',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'customElements.define("abc-component")',
      options: [
        {
          suffix: 'element'
        }
      ],
      errors: [
        {
          message: 'Custom Element name must end with a suffix: element',
          type: 'Literal'
        }
      ]
    }
  ]
})
