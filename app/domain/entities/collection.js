
const isObject = (obj) => obj !== null && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
const NEW = 'NEW';
const UPDATED = 'UPDATED';
const REMOVED = 'REMOVED';


const Collection = {
  get(key) { return this._col.find(i => i[this._pk] === key) },
  getIndex(key) { return this._col.findIndex(i => i[this._pk] === key) },
  add(item) {
    this._col.push(Object.assign({}, item, {_status: NEW}))
    return this
  },
  remote(item) {
    const key = item[this._pk] || item
    const idx = this.getIndex(key)

    if (idx >= 0) {
      this._col[idx]._status = REMOVED
    }

    return this
  },
  update(item) {
    const key = item[this._pk]
    const idx = this.getIndex(key)

    if (idx >= 0) {
      this._col.splice(idx, 1, Object.assign({}, item, {_status: UPDATED}))
    }

    return this
  },

  getNew() { return this._col.filter(i => i._status === NEW) },
  getUpdated() { return this._col.filter(i => i._status === UPDATED) },
  getModified() { return this._col.filter(i => i._status === NEW || i._status === UPDATED) },
  getRemoved() { return this._col.filter(i => i._status === REMOVED) },
}

const arrayMethods = [
  'filter', 'find', 'findIndex', 'sort',
  'entries', 'every', 'forEach', 'map',
  'reduce', 'some', 'values',
]

arrayMethods.forEach(method => {
  Collection[method] = function(...args) { return this._col[method].apply(this._col, args) }
})

const collectionPrototype = Object.assign({}, Collection)

const CreateCollection = (items, options) => {
  if (isObject(items)) {
    options = items
    items = []
  }

  items = items || [];
  options = options || {};

  if (!Array.isArray(items)) throw new Error('Expected `items` to be an Array')

  const collectionProps = {
    length: { get: function() { return this._col.length} }
  }

  const collection = Object.assign(
    Object.create(collectionPrototype, collectionProps),
    {
      _pk: options.primaryKey || 'id',
      _col: items
    }
  )

  return collection
}

module.exports = CreateCollection