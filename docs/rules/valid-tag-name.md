# Valid Tag Name

To be able to use a Custom Element, it must be defined in the `customElements` registry with a valid tag name. Certain characters are allowed for tag names, and invalid tag-names will throw a `DOMException` during runtime.

## Rule Details

This rule enforces that calls to `customElements.define` or `customElements.whenDefined` express a valid tag name. There are certain mandatory rules a tag name must follow - such as starting with a letter, and including one dash. This rule will check the name follows these rules.

In addition, this rule can be customised to perform additional checks, such as requiring a prefix, or disallowing known prefixes such as `x-`.

👎 Examples of **incorrect** code for this rule:

```js
customElements.define('foobar', ...)
```

👍 Examples of **correct** code for this rule:

```js
customElements.define('foo-bar', ...)
```

### Options

 - `onlyAlphanum` is a boolean option (default: `false`). When set to `true` it will only allow tag names to consist of alphanumeric characters from a-z, 0-9. The spec allows for a broad range of additional characters such as some emoji, which will be disallowed if this rule is set to `true`.

 - `disallowNamespaces` is a boolean option (default: `false`). When set to `true` it will check the tag does not match an existing well known namespace, such as `x-` or `google-`, etc. Setting this rule to true limits the risk of collision with other third-party element names.

 - `suffix` can be set to one or more strings, and elements must use at least one of these suffixes.

 - `prefix` can be set to one or more strings, and elements must use at least one of these prefixes.

## When Not To Use It

If you do not want to validate the names passed to `customElements.define` or `customElements.whenDefined` then you can disable this rule.

## Version

This was added in v0.0.1
