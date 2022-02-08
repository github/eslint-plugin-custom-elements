const rule = require('../lib/rules/extends-correct-class')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('extends-correct-class', rule, {
  valid: [
    {code: 'customElements.define("foo-bar", class extends HTMLElement {})'},
    {code: 'customElements.define("foo-bar", class extends HTMLDivElement {}, { extends: "div" })'},
    {code: 'customElements.define("foo-bar", class extends HTMLOListElement {}, { extends: `ol` })'},
    {
      code: 'customElements.define("foo-bar", class extends HTMLGitHubElement {})',
      options: [{allowedSuperNames: ['HTMLGitHubElement']}]
    },
    {
      code: 'customElements.define("foo-bar", class extends HTMLElement {})',
      options: [{allowedSuperNames: ['HTMLGitHubElement']}]
    }
  ],
  invalid: [
    {
      code: 'customElements.define("foo-bar", class {})',
      errors: [
        {
          message: 'Custom Element must extend HTMLElement',
          type: 'ClassExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class {}, { extends: "p" })',
      errors: [
        {
          message: 'Custom Element must extend HTMLParagraphElement',
          type: 'ClassExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class extends Map {})',
      errors: [
        {
          message: 'Custom Element must extend HTMLElement not Map',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class extends HTMLParagraphElement {})',
      errors: [
        {
          message: "Custom Element must extend HTMLElement, or pass {extends:'p'} as a third argument to define",
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class extends HTMLDivElement {}, { extends: "p" })',
      errors: [
        {
          message:
            "Custom Element extends HTMLDivElement but the definition includes {extends:'p'}. Either the Custom Element must extend from HTMLParagraphElement, or the definition must include {extends:'div'}.",
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class extends HTMLGitHubElement {}, { extends: `ol` })',
      options: [{allowedSuperNames: ['HTMLGitHubElement']}],
      errors: [
        {
          message: 'HTMLGitHubElement !== HTMLOListElement',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'customElements.define("foo-bar", class extends HTMLGitHubThreeElement {})',
      options: [{allowedSuperNames: ['HTMLGitHubOneElement', 'HTMLGitHubTwoElement']}],
      errors: [
        {
          message:
            'Custom Element must extend {HTMLGitHubOneElement, HTMLGitHubTwoElement, HTMLElement} not HTMLGitHubThreeElement',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
