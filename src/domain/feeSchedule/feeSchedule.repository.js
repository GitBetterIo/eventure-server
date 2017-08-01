
const SCHEDULE_TABLE = 'ev_fee_schedule';
const SCHEDULE_RULE_TABLE = 'ev_fee_schedule_rule';

module.exports = db => ({
  findByEventure: eventureId => find(db, {eventureId}, {limit: 1}),
})


function find(db, query, options) {

  const schedule = findFeeSchedule(db, query, options).then(getFirst);
  const rules = schedule.then(schedule => (!!schedule)
    ? findFeeSceduleRules(db, {scheduleId: schedule.id})
    : []);

  return Promise.all([schedule, rules])
    .then((schedule, rules) => {
      if (!schedule) return null,

      return Object.assign({}, schedule, {rules})
    })

}


function findFeeSchedule(db, query, options) {
  const whereClauses = [];
  if (query.id) whereClauses.push('id=${id}');
  if (query.eventureId) whereClauses.push('eventure_id=${eventureId}');
  const whereClause = whereClauses.join(' AND ');

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'username ASC');

  const sql = `SELECT *
    FROM ${EVENTURE_TABLE}
    ${whereClause}
    ${orderClause}
    ${limitClause}
    ${offsetClause}`;

}

function findFeeSceduleRules(db, query, options) {
  const whereClauses = [];
  if (query.scheduleId) whereClauses.push('schedule_id=${scheduleId}');
  const whereClause = whereClauses.join(' AND ');

  const limitClause = 'LIMIT ' + ((options.limit) ? options.limit : 20);
  const offsetClause = 'OFFSET ' + ((options.offset) ? options.offset : 0);
  const orderClause = 'ORDER BY ' + ((options.orderBy) ? options.orderBy : 'username ASC');

  const sql = `SELECT *
  FROM ${EVENTURE_TABLE}
  ${whereClause}
  ${orderClause}
  ${limitClause}
  ${offsetClause}`;

}


const getFirst = list => (list && list.length) ? list[0] : null;
