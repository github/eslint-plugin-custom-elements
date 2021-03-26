module.exports = {
  snake(str) {
    return str
      .replace(/([A-Z]($|[a-z]))/g, '_$1')
      .replace(/^_/g, '')
      .toLowerCase()
  },
  kebab(str) {
    return str
      .replace(/([A-Z]($|[a-z]))/g, '-$1')
      .replace(/^-/g, '')
      .toLowerCase()
  },
  pascal(str) {
    return str.replace(/^./g, c => c.toLowerCase())
  },
  none(str) {
    return str
  }
}
