const rule = require('../lib/rules/file-name-matches-element')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}})
const code = 'class FooBarElement extends HTMLElement {}'

ruleTester.run('file-name-matches-element', rule, {
  valid: [
    {code: 'class SomeMap extends Map {}', filename: 'not-an-element.js'},
    {code: 'class FooBarElement {}', filename: 'not-related.js'},
    {code},
    {code, filename: '<text>'},
    {code, filename: '<input>'},
    {code, filename: 'fooBarElement.js'},
    {code, filename: 'fooBarElement.ts'},
    {code, filename: 'fooBarElement.jsx'},
    {code, filename: 'foo-bar-element.js'},
    {code, filename: 'foo-bar-element.ts'},
    {code, filename: 'foo-bar-element.jsx'},
    {code, filename: 'FooBarElement.js', options: [{transform: 'none'}]},
    {code, filename: 'FooBarElement.ts', options: [{transform: 'none'}]},
    {code, filename: 'FooBarElement.jsx', options: [{transform: 'none'}]},
    {code, filename: 'foo_bar_element.js', options: [{transform: 'snake'}]},
    {code, filename: 'foo_bar_element.ts', options: [{transform: 'snake'}]},
    {code, filename: 'foo_bar_element.jsx', options: [{transform: 'snake'}]},
    {code, filename: 'foo-bar-element.js', options: [{transform: 'kebab'}]},
    {code, filename: 'foo-bar-element.ts', options: [{transform: 'kebab'}]},
    {code, filename: 'foo-bar-element.jsx', options: [{transform: 'kebab'}]},
    {code, filename: 'fooBarElement.js', options: [{transform: 'pascal'}]},
    {code, filename: 'fooBarElement.ts', options: [{transform: 'pascal'}]},
    {code, filename: 'fooBarElement.jsx', options: [{transform: 'pascal'}]},
    {code, filename: 'fooBarElement.js', options: [{transform: ['snake', 'kebab', 'pascal']}]},
    {code, filename: 'fooBarElement.ts', options: [{transform: ['snake', 'kebab', 'pascal']}]},
    {code, filename: 'fooBarElement.jsx', options: [{transform: ['snake', 'kebab', 'pascal']}]},
    {code, filename: 'fooBar.js', options: [{transform: 'pascal', suffix: 'Element'}]},
    {code, filename: 'foo-bar.js', options: [{transform: 'kebab', suffix: 'element'}]},
    {code, filename: 'foo_bar.js', options: [{transform: 'snake', suffix: 'element'}]},
    {code, filename: 'foo_bar.js', options: [{transform: ['kebab', 'snake', 'pascal'], suffix: 'Element'}]},
    {code, filename: 'foo_bar_element.js', options: [{transform: ['kebab', 'snake'], suffix: ['Element']}]},
    {code, filename: 'fooBarElement.js', options: [{transform: ['kebab', 'pascal'], suffix: ['ElEmEnT']}]},
    {code, filename: 'bar_element.js', options: [{transform: ['kebab', 'snake'], prefix: ['Foo']}]},
    {code, filename: 'bar_element.js', options: [{transform: ['kebab', 'snake'], prefix: ['fOo']}]},
    {
      code: 'class FooBarController extends HTMLElement {}',
      filename: 'components/foo/bar.ts',
      options: [{transform: 'kebab', suffix: ['Controller'], matchDirectory: true}],
    },
    {
      code: 'class FooBarController extends HTMLElement {}',
      filename: 'components/foo/foo-bar.ts',
      options: [{transform: 'kebab', suffix: ['Controller']}],
    },
    {
      code: 'window.customElements.define("foo-bar", class extends HTMLElement {})',
      filename: 'any.js',
    },
  ],
  invalid: [
    {
      code,
      filename: 'barfooelement.ts',
      errors: [
        {
          message: 'File name should be "foo-bar-element" or "fooBarElement" but was "barfooelement"',
          type: 'ClassDeclaration',
        },
      ],
    },
    {
      code,
      filename: 'foobarelement.ts',
      errors: [
        {
          message: 'File name should be "foo-bar-element" or "fooBarElement" but was "foobarelement"',
          type: 'ClassDeclaration',
        },
      ],
    },
    {
      code,
      filename: 'foobarelement.ts',
      options: [{transform: ['snake']}],
      errors: [
        {
          message: 'File name should be "foo_bar_element" but was "foobarelement"',
          type: 'ClassDeclaration',
        },
      ],
    },
    {
      code,
      filename: 'foo-bar_element.ts',
      options: [{transform: ['kebab']}],
      errors: [
        {
          message: 'File name should be "foo-bar-element" but was "foo-bar_element"',
          type: 'ClassDeclaration',
        },
      ],
    },
    {
      code,
      filename: 'foo-bar-controller.ts',
      options: [{transform: 'kebab', suffix: ['Element']}],
      errors: [
        {
          message: 'File name should be "foo-bar-element" or "foo-bar" but was "foo-bar-controller"',
          type: 'ClassDeclaration',
        },
      ],
    },
    {
      code,
      filename: 'foo-bar-controller.ts',
      options: [{transform: 'kebab', suffix: ['Controller']}],
      errors: [
        {
          message: 'File name should be "foo-bar-element" but was "foo-bar-controller"',
          type: 'ClassDeclaration',
        },
      ],
    },
  ],
})
