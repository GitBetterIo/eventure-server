
const NEW = 'NEW';
const UPDATED = 'UPDATED';
const REMOVED = 'REMOVED';
const requiredOptions = ['collectionProperty', 'primaryKey']

const set = (collectionProperty, obj, items) => {
  items = [].concat(items || []);
  return Object.assign({}, obj, {[collectionProperty]: items})
}

const find = (collectionProperty, primaryKey, obj, key) => obj[collectionProperty].find(i => i[primaryKey] === key);
const findIndex = (collectionProperty, primaryKey, obj, key) => obj[collectionProperty].findIndex(i => i[primaryKey] === key);

const add = (collectionProperty, obj, item) => {
  item = Object.assign({}, item, {_status: NEW});
  const items = (obj[collectionProperty] || []).concat(item);
  return Object.assign({}, obj, {[collectionProperty]: items});
}

const remove = (collectionProperty, primaryKey, obj, key) => {
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


module.exports = function Collection(options) {
  options = options || {};

  const missing = requiredOptions.filter(opt => !options.hasOwnProperty(opt))
  if (missing.length) {
    throw new Error(`Missing collection options [${missing.join(', ')}]`)
  }

  const {collectionProperty, primaryKey, foreignKey} = options;

  return {
    set: (...args) => set(collectionProperty, ...args),
    find: (...args) => find(collectionProperty, primaryKey, ...args),
    add: (...args) => add(collectionProperty, ...args),
    remove: (...args) => remove(collectionProperty, primaryKey, ...args),
    update: (...args) => update(collectionProperty, primaryKey, ...args),
    getNew: (...args) => getNew(collectionProperty, ...args),
    getUpdated: (...args) => getUpdated(collectionProperty, ...args),
    getRemoved: (...args) => getRemoved(collectionProperty, ...args),
  }
}
