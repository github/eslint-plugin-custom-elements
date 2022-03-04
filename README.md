# eslint-plugin-custom-elements

This is an ESLint Plugin to help provide best practices for writing Custom Elements aka Web Components. It provides a set of custom rules which can be enforced for files that declare classes that extend from HTMLElement.

## Requirements

Node 14.x

## Installation

```sh
$ npm install --save-dev eslint eslint-plugin-custom-elements
```

## Setup

Add `custom-elements` to your list of plugins in your ESLint config, and enable the rules you want or just add `plugin:custom-elements/recommended` to the `extends` array.

JSON ESLint config example:

```json
{
  "extends": ["plugin:custom-elements/recommended"]
}
```

### Rules

- [Define Tag After Class Definition](./docs/rules/define-tag-after-class-definition.md)
- [Expose Class on Global](./docs/rules/expose-class-on-global.md)
- [Extends Correct Class](./docs/rules/extends-correct-class.md)
- [File Name Matches Element](./docs/rules/file-name-matches-element.md)
- [No Constructor](./docs/rules/no-constructor.md)
- [No Customized Built in Elements](./docs/rules/no-customized-built-in-elements.md)
- [No DOM Traversal in Attributechangedcallback](./docs/rules/no-dom-traversal-in-attributechangedcallback.md)
- [No DOM Traversal in Connectedcallback](./docs/rules/no-dom-traversal-in-connectedcallback.md)
- [No Exports with Element](./docs/rules/no-exports-with-element.md)
- [No Method Prefixed with on](./docs/rules/no-method-prefixed-with-on.md)
- [No Unchecked Define](./docs/rules/no-unchecked-define.md)
- [One Element Per File](./docs/rules/one-element-per-file.md)
- [Tag Name Matches Class](./docs/rules/tag-name-matches-class.md)
- [Valid Tag Name](./docs/rules/valid-tag-name.md)

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
