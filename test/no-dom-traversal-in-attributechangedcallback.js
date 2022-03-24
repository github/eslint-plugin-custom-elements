const rule = require('../lib/rules/no-dom-traversal-in-attributechangedcallback')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})

ruleTester.run('no-dom-traversal-in-attributeChangedCallback', rule, {
  valid: [
    {code: 'document.querySelector("hello")'},
    {code: 'class FooBar { attributeChangedCallback() { this.querySelector("hello") } }'},
    {code: 'class FooBar extends HTMLElement { update() { this.querySelector("hello") } }'},
    {code: 'class FooBar extends HTMLElement { attributeChangedCallback() { this.innerHTML = "<h1>foo</h1>" } }'},
    {code: 'document.children'},
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { this.children = [1] } }'
    }
  ],
  invalid: [
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { this.querySelector("hello") } }',
      errors: [
        {
          message: 'DOM traversal using .querySelector inside attributeChangedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { document.querySelector("hello") } }',
      errors: [
        {
          message: 'DOM traversal using .querySelector inside attributeChangedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { this.foo.querySelector("hello") } }',
      errors: [
        {
          message: 'DOM traversal using .querySelector inside attributeChangedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { this.children } }',
      errors: [
        {
          message: 'DOM traversal using .children inside attributeChangedCallback() is error prone.',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { console.log(this.innerHTML) } }',
      errors: [
        {
          message: 'DOM traversal using .innerHTML inside attributeChangedCallback() is error prone.',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { console.log(this.innerText) } }',
      errors: [
        {
          message: 'DOM traversal using .innerText inside attributeChangedCallback() is error prone.',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: 'class FooBar extends HTMLElement { attributeChangedCallback() { console.log(this.textContent) } }',
      errors: [
        {
          message: 'DOM traversal using .textContent inside attributeChangedCallback() is error prone.',
          type: 'MemberExpression'
        }
      ]
    },
    {
      code: `
class FooBarElement extends HTMLElement {
  attributeChangedCallback() {
    this.addEventListener("update", () => {
      const button = this.querySelector('button')
      if (button) {
        button.disabled = true
      }
    })
  }
}
`,
      errors: [
        {
          message: 'DOM traversal using .querySelector inside attributeChangedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    },
    {
      code: `
class FooBarElement extends HTMLElement {
  attributeChangedCallback() {
    new MutationObserver(() => {
      const button = this.querySelector('button')
      if (button) {
        button.disabled = true
      }
    }).observe(this)
  }
}`,
      errors: [
        {
          message: 'DOM traversal using .querySelector inside attributeChangedCallback() is error prone.',
          type: 'CallExpression'
        }
      ]
    }
  ]
})
