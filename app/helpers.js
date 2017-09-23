module.exports = ({
  slugify: str => str.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''), // remove leading, trailing -

  getMissingProps: (requiredProps, obj) => requiredProps.filter(p => !obj.hasOwnProperty(p)),

  toObject: (obj) => JSON.parse(JSON.stringify(obj)),
})