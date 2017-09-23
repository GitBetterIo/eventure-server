
const NEW = 'NEW';
const UPDATED = 'UPDATED';
const REMOVED = 'REMOVED';

const setStatus = status => i => Object.assign({}, i, {_status: status})
const setNew = setStatus(NEW)
const setUpdated = setStatus(UPDATED)
const setRemoved = setStatus(REMOVED)

const create = (createFn, items=[]) => {
  return items.map(createFn)
}

const find = (primaryKey, obj, key) => obj[collectionProperty].find(i => i[primaryKey] === key);
const findIndex = (primaryKey, collection, id) => collection.findIndex(i => i[primaryKey] === key);

const add = (createFn, collection, item) => {
  return collection.concat(setNew(createFn(item)))
}

const remove = (primaryKey, obj, key) => {
  const idx = findIndex(collectionProperty, primaryKey, obj, key);
  const doomed = Object.assign({}, obj[collectionProperty][idx], {_status: REMOVED});
  const items = obj[collection].slice(0);
  items.splice(idx, 1, doomed);
  return Object.assign({}, obj, {[collectionProperty]: items});
}

const update = (collectionProperty, primaryKey, obj, key, data) => {
  const idx = findIndex(collectionProperty, primaryKey, obj, key);
  const changed = Object.assign({}, obj[collectionProperty][idx], data, {_status: UPDATED});
  const items = obj[collection].slice(0);
  items.splice(idx, 1, changed);
  return Object.assign({}, obj, {[collectionProperty]: items});
}

const getNew = (collectionProperty, obj) => obj[collectionProperty].filter(i => i._status === NEW);
const getUpdated = (collectionProperty, obj) => obj[collectionProperty].filter(i => i._status === UPDATED);
const getRemoved = (collectionProperty, obj) => obj[collectionProperty].filter(i => i._status === REMOVED);
const getModified = (collectionproperty, obj) => obj[collectionProperty].filter(i => i._status === NEW || i._status === UPDATED);


module.exports = function Collection(options) {
  options = options || {};

  const requiredOptions = ['collectionProperty', 'primaryKey', 'create']
  const missing = requiredOptions.filter(opt => !options.hasOwnProperty(opt))
  if (missing.length) {
    throw new Error(`Missing collection options [${missing.join(', ')}]`)
  }


  const {
    primaryKey='id', 
    foreignKey, 
    create: createFn
  } = options
  const findFn = id => item => item[primaryKey] === id

  return {
    create: (items) => create(createFn, items),
    add: (...args) => add(createFn, ...args),
    remove: (...args) => remove(collectionProperty, primaryKey, ...args),
    update: (...args) => update(collectionProperty, primaryKey, ...args),
    getNew: (...args) => getNew(collectionProperty, ...args),
    getUpdated: (...args) => getUpdated(collectionProperty, ...args),
    getRemoved: (...args) => getRemoved(collectionProperty, ...args),
  }
}
