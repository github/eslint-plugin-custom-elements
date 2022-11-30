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
  },
  *generateNames(prefixes, suffixes, name) {
    for (const prefix of prefixes) {
      if (name.toLowerCase().startsWith(prefix.toLowerCase())) {
        const truncated = name.slice(prefix.length)
        yield truncated
        for (const suffix of suffixes) {
          if (truncated.toLowerCase().endsWith(suffix.toLowerCase())) {
            yield truncated.slice(0, truncated.length - suffix.length)
          }
        }
      }
    }
    for (const suffix of suffixes) {
      if (name.toLowerCase().endsWith(suffix.toLowerCase())) {
        const truncated = name.slice(0, name.length - suffix.length)
        yield truncated
        for (const prefix of prefixes) {
          if (truncated.toLowerCase().startsWith(prefix.toLowerCase())) {
            yield truncated.slice(prefix.length)
          }
        }
      }
    }
  },
}
