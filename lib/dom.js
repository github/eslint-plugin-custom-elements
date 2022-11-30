module.exports = {
  properties: new Set([
    // ParentNode
    'childElementCount',
    'children',
    'firstElementChild',
    'lastElementChild',

    // Node
    'childNodes',
    'firstChild',
    'lastChild',
    'innerText',
    'innerHTML',
    'textContent',
  ]),
  methods: new Set([
    // Document
    'getElementById',
    'getElementsByClassName',
    'getElementsByTagName',

    // ParentNode
    'querySelector',
    'querySelectorAll',

    // Node
    'contains',
    'hasChildNodes',
    'insertBefore',
    'removeChild',
    'replaceChild',
  ]),
  allowedScopes: new Set(['addEventListener', 'MutationObserver']),
}
