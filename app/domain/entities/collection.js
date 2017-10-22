const observable = require('./observable')

const isObject = (obj) => obj !== null && typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
const NEW = 'NEW';
const UPDATED = 'UPDATED';
const REMOVED = 'REMOVED';


const makeObservable = item => {
  const obs = observable(item)
  obs.on('changed', (item, name, oldValue, newValue) => {
    if (name === '_status') return
    if (item._status !== NEW) {
      item._status = UPDATED
    }
  })

  return obs
}


const Collection = {
  get(key) { return this._col.find(i => i[this._pk] === key) },
  getIndex(key) { return this._col.findIndex(i => i[this._pk] === key) },
  add(item) {
    item = makeObservable(Object.assign(item, {_status: NEW}))
    this._col.push(item)
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
  commit() {
    this._col = this._col
      .filter(i => i._status !== REMOVED)
      .map(i => {
        i._status = undefined;
        return i
      })
  },
  toJSON() { return this._col; },
  toArray() { return this._col; },
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
      _col: items.map(makeObservable)
    }
  )

  return collection
}

module.exports = CreateCollection