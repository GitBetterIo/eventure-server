const Knex = require('knex');


module.exports = ({config}) => {

  function stringSnakeToCamel(s){
    return s.replace(/(_\w)/g, m => m[1].toUpperCase() );
  }

  function stringCamelToSnake(s) {
    return s.replace(/([A-Z])/g, m => "_" + m.toLowerCase() );
  }

  const alterKeys = fn => obj => Object.keys(obj).reduce((alt, key) => Object.assign(
    alt,
    {[fn(key)]: obj[key]}
  ), {})


  const getTableNames = ()  => {
    const sql = `select *
      FROM information_schema.tables
      WHERE
        table_schema = 'public'
        AND table_name NOT IN ('migrations')`;
    return db.raw(sql)
      .then(tbls => tbls.rows)
      .map(tbl => tbl.table_name)
  }
  




  const db = Knex(config.db);
  db.stringSnakeToCamel = stringSnakeToCamel
  db.stringCamelToSnake = stringCamelToSnake
  db.snakeToCamel = alterKeys(stringSnakeToCamel);
  db.camelToSnake = alterKeys(stringCamelToSnake);
  db.getTableNames = getTableNames;

  return db;
}