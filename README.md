# eslint-plugin-custom-elements

This is an Eslint Plugin to help provide best practices for writing Custom Elements aka Web Components. It provides a set of custom rules which can be enforced for files which declare classes that extend from HTMLElement.

## Installation

```sh
$ npm install --save-dev eslint eslint-plugin-custom-elements
```

## Setup

Add `custom-elements` to your list of plugins in your ESLint config, and `plugin:custom-elements/recommended` to the `extends` array.

JSON ESLint config example:
```json
{
  "plugins": ["github"],
  "extends": ["plugin:custom-elements/recommended"]
}
```

### Rules
