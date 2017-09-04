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


  return {
    db,
    getTableNames,
    userProfile: require('./userProfile')(db),
  }

}
