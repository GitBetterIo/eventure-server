module.exports = ({ dbService: db }) => {

  async function findLoginByEmail(email) {
    let person = await db('person').first('*').where('email', email)

    if (!person) return null
  
    let login = await db('person_login').first('*').where('id', person.id)
    person = db.snakeToCamel(person)
    person.login = db.snakeToCamel(login)
  
    return person
  }

  
  async function findByToken(token) {
    const accessToken = await db('access_token').first('*').where('token', token)
    if (!accessToken) return null;

    return findById(accessToken.person_id)
  }

  async function findById(id) {
    if (!id) throw new Error(`Missing required parameter 'id' from findById`)
    let person = await db('person').first('*').where('id', id)
    let login = await db('person_login').first('*').where('id', id)

    person = db.snakeToCamel(person)
    login = db.snakeToCamel(login)

    return (person) ? Object.assign(person, {login}) : null;
  }

  /**
   * Return an array of People belonging to an organization
   * Login information is not included in this query
   * 
   * @param {String} options.organizationId The organization to search for 
   * @param {String} options.type Type of person. If blank, the query will return all non-Admins 
   */
  async function findByOrganization({organizationId, type}) {
    if (!organizationId) throw new Error ('Expected `organizationId` from query')

    const query = db('person').select('*').where('organization_id', organizationId)
    if (type) {
      query.where({type})
    } else {
      query.whereNot({type: 'admin'})
    }

    try {
      const people = await query
      return people.map(db.snakeToCamel)
    } catch (err) {
      throw err
    }

  }

  return {
    findLoginByEmail,
    findByToken,
    findById,
    findByOrganization,
  }
  
}