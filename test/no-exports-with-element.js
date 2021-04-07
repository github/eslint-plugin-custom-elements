const rule = require('../lib/rules/no-exports-with-element')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({env: {es2020: true}, parserOptions: {sourceType: 'module'}})
ruleTester.run('no-exports-with-element', rule, {
  valid: [
    {code: 'class SomeMap extends Map { }\nexport {SomeMap}'},
    {code: 'export class SomeMap extends Map { }\nexport class SomeOtherMap extends Map { }'},
    {code: 'class SomeMap extends Map { }\nexport {SomeMap}\nexport const a = 1'},
    {code: 'class FooBarElement extends HTMLElement { }\nexport {FooBarElement}'},
    {code: 'class FooBarElement extends HTMLElement { }\nexport default FooBarElement'},
    {code: 'export class a extends HTMLElement { }\nexport class b extends HTMLElement { }'},
    {code: 'export function baz() { const foo = "bar" }'},
    {
      code:
        'export class a extends Map { }\nexport default class extends Map { }\nexport const b = class extends Map {}'
    },
    {
      code:
        'class FooBarElement extends HTMLElement { }\nclass BarFooElement extends HTMLElement { }\nexport {FooBarElement}\nexport {BarFooElement}'
    },
    {
      code: `class FooBarElement extends HTMLElement { }
export {FooBarElement}
class BarFooElement extends HTMLElement { }
export default BarFooElement
export class BazElement extends HTMLElement { }
export const QuxElement = class extends HTMLElement { }
export const QuuxElement = FooBarElement`
    }
  ],
  invalid: [
    {
      code: `class FooBarElement extends HTMLElement { }
class Wibble extends Map { }
export {Wibble}
class SomeMap extends Map { }
export default SomeMap
export class OtherMap extends Map { }
export const FourthMap = class extends Map { }
export const Wobble = Wibble`,
      errors: [
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 3,
          type: 'Identifier'
        },
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 5,
          type: 'Identifier'
        },
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 6,
          type: 'ClassDeclaration'
        },
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 7,
          type: 'ClassExpression'
        },
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 8,
          type: 'Identifier'
        }
      ]
    },
    {
      code: 'export class a extends HTMLElement { }\nexport class b extends HTMLElement { }\nexport const c = 1',
      errors: [
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 3,
          type: 'Literal'
        }
      ]
    },
    {
      code:
        'export class FooBarElement extends HTMLElement {}\n export class a extends Map { }\nexport default class extends Map { }\nexport const b = class extends Map {}',
      errors: [
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 2,
          type: 'ClassDeclaration'
        },
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 3,
          type: 'ClassDeclaration'
        },
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 4,
          type: 'ClassExpression'
        }
      ]
    },
    {
      code: 'export class FooBarElement extends HTMLElement { }\nexport function myHelper() { }',
      errors: [
        {
          message: 'Do not export non-custom elements along custom elements',
          line: 2,
          type: 'FunctionDeclaration'
        }
      ]
    }
  ]
})
