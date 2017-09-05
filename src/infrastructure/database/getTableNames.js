

module.exports = db => ()  => {
  const sql = `select *
    FROM information_schema.tables
    WHERE
      table_schema = 'public'
      AND table_name NOT IN ('migrations')`;
  return db.raw(sql)
    .then(tbls => tbls.rows)
    .map(tbl => tbl.table_name)
}
