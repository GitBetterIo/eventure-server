const isArray = require('lodash/isArray')
const isString = require('lodash/isString')
const isPlainObject = require('lodash/isPlainObject')
const isFunction = require('lodash/isFunction')
const omit = require('lodash/omit')
const pick = require('lodash/pick')

const stringSnakeToCamel = s => s.replace(/(_\w)/g, m => m[1].toUpperCase() )
const stringCamelToSnake = s => s.replace(/([A-Z])/g, m => "_" + m.toLowerCase() )
const alterKeys = fn => obj => Object.keys(obj).reduce((alt, key) => Object.assign(
  alt,
  {[fn(key)]: obj[key]}
), {})
const snakeToCamel = alterKeys(stringSnakeToCamel)
const camelToSnake = alterKeys(stringCamelToSnake)

const Datastore = {

  find(query, options={}) {
    const snakeQuery = camelToSnake(query);
    const {limit=50, offset=0, join} = options;
  
    const selectQuery = this.db
      .select('*')
      .from(this.tableName)
      .limit(limit)
      .offset(offset)
  
    
    Object
      .keys(query)
      .filter(fld => this.queryable.hasOwnProperty(fld))
      .forEach(fld => {
        const value = query[fld]
        const dbField = stringCamelToSnake(fld)

        selectQuery.where(dbField, value);
      })

    if (this.softDelete && !query[this.softDelete]) selectQuery.where(this.softDelete, 'false');
      

    if (this.beforeQuery) {
      this.beforeQuery(selectQuery, query, options)
    }
  
    return selectQuery
      .map(snakeToCamel)
  },

  async findOne(query, options) {
    const rows = await this.find(query, options);
    return (rows.length) ? rows[0] : null;
  },

  async save(data, options) {
    data = {...data} // shallow copy

    if (this.beforeSave) {
      this.beforeSave(data)
    }

    if (this.fields) {
      data = pick(data, this.fields)
    }

    const dbData = this.softDelete
      ? camelToSnake(omit(data, this.softDelete))
      : camelToSnake(data)

  
    const insert = this.db(this.tableName).insert(dbData);
    const update = this.db.update(dbData)
    const upsert = this.db.raw(`? ON CONFLICT (${this.primaryKey}) DO ? RETURNING *`, [insert, update]);
    return upsert
      .then(res => res.rows[0])
      .then(row => snakeToCamel(row));
  
  },

  remove(query, options) {
    return (this.softDelete)
      ? this.db(this.tableName).where(query).update({[this.softDelete]: true})
      : this.purge(query, options)
  },
  
  
  purge(query, options) {
    return this.db(this.tableName).where(query).del();
  }
}

module.exports = options => {

  if(!isString(options.tableName)) {
    throw new Error('Missing required string `tableName`')
  }

  if (isArray(options.queryable)) {
    if (options.queryable.some(q => !isString(q))) {
      throw new Error('If `queryable` is an array, all memebers must be strings')
    }

    options.queryable = options.queryable.reduce((obj, field) => ({ ...obj, [field]: field }), {})
  } else if (isPlainObject(options.queryable) && options.queryable.values().some(v => !isFunction(v))) {
    throw new Error('If `queryable` is an object, all values must be functions')
  } else if (!isArray(options.queryAble) && !isPlainObject(options.queryable)) {
    throw new Error('Expected `queryable` to be an Array or Object')
  } else {
    options.queryable = {}
  }

  if (options.beforeQuery && !isFunction(options.beforeQuery)) {
    throw new Error('Expected `beforeQuery` to be a function')
  }
  if (options.beforeSave && !isFunction(options.beforeSave)) {
    throw new Error('Expected `beforeSave` to be a function')
  }

  const datastore = Object.assign(
    Object.create(Datastore),
    {
      primaryKey: 'id',
      softDelete: 'deleted',
    },
    options
  )

  return datastore

}


{
  db => w 
}