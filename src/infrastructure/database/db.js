const Knex = require('knex');



function snakeToCamel(s){
  return s.replace(/(_\w)/g, m => m[1].toUpperCase() );
}

function camelToSnake(s) {
  return s.replace(/([A-Z])/g, m => "_" + m.toLowerCase() );
}

const alterKeys = fn => obj => Object.keys(obj).reduce((alt, key) => Object.assign(
  alt,
  {[fn(key)]: obj[key]}
), {})


module.exports = config => {


  const db = Knex(config.db);
  db.snakeToCamel = alterKeys(snakeToCamel);
  db.camelToSnake = alterKeys(camelToSnake);

  return db;
}