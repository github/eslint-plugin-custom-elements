# No Constructor

This rule disallows using the `constructor` in a HTMLElement class.

## Rule Details

👎 Examples of **incorrect** code for this rule:

```js
```

👍 Examples of **correct** code for this rule:

```js
```

The `constructor` method is a little unwieldy to use for subclasses. It is called as soon as the class is instantiated with `document.createElement` which will be _before_ the element has been appended to the DOM.

It is better to put code within the `connectedCallback` which is fired when the element has been appended into the DOM.

Many expectations from an element are not true during the `constructor` call. For example you cannot:

 - read any attributes on the element (`.attributes` will always be an empty `NamedNodeMap`).
 - access any child elements (`.children` will always be an empty `HTMLCollection`).
 - Fire events that bubble. As the node is not connected it cannot bubble.

Also there are many edge cases which can cause complications when within the constructor, for example:

 - Creating child elements and appending them, this will cause _their_ connected callbacks to fire, but their parent (the current element) will be disconnected from the DOM.
 - Changing attributes will cause `attributeChangedCallback` to fire, which may expect to be connected.

## When Not To Use It

If you are comfortable with the trade-offs of using the `constructor` function.

## Version

This rule was introduced in v0.0.1
