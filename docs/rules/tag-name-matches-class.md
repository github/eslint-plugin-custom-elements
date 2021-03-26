# Tag Name Matches Class

Custom Element can be registered as a any valid HTML tag.

## Rule Details

This rule enforces that the tag name that a Custom Element is registered under is a kebab-case of the elements class name.

👎 Examples of **incorrect** code for this rule:

```js
customElements.define('bar-foo', FooBarElement)
```

👍 Examples of **correct** code for this rule:

```js
customElements.define('foo-bar', FooBarElement)
```

### Options

- `suffix` can allow omission of a suffix from a tag name. Typed as a string or a list of strings, case sensitive and defaults to `['Element']`.

👍 Examples of **correct** code for different `suffix` options:

- `["error": {"suffix": []}]`
  - `customElements.define('foo-bar', FooBar)`

- `["error": {"suffix": 'Component'}]`
  - `customElements.define('foo-bar', FooBarComponent)`

- `["error": {"suffix": ['Element', 'Component']}]`
  - `customElements.define('foo-bar', FooBarComponent)`
  - `customElements.define('foo-bar', FooBarElement)`

## When Not To Use It

If you intentionally want to name your custom elements differently to their defined tag names.

## Version

This rule was introduced in v0.0.1.
