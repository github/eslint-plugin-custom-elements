# No DOM Traversal in Connectedcallback

The intent of the `connectedCallback` is to set up event listeners and instantiate state. Traversing the DOM during the `connectedCallback` phase is error-prone, because the callback might fire before an elements children have been appended. Additionally, as `connectedCallback` only fires once, any DOM mutations that happen once the element is connected will not be resolved, so any state that traversed the DOM will fall out of synchronisation.

It is instead preferable to move such DOM traversals into event listeners, or a `MutationObserver` to track changes in children.

## Rule Details

👎 Examples of **incorrect** code for this rule:

```js
class FooBarElement extends HTMLElement {

  connectedCallback() {
    this.querySelector('button')?.disabled = true
  }

}
```


👍 Examples of **correct** code for this rule:

```js
class FooBarElement extends HTMLElement {

  connectedCallback() {
    new MutationObserver(() => {
      this.querySelector('button')?.disabled = true
    }).observe(this)
  }

}
```

```js
class FooBarElement extends HTMLElement {

  connectedCallback() {
    this.addEventListener('update', () => {
      this.querySelector('button')?.disabled = true
    })
  }

}
```

## When Not To Use It

If you 

## Version
