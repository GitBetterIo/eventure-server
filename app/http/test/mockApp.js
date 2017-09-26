// just to be 100%
process.env.NODE_ENV = 'test';
const uuid = require('uuid/v4')
const config = require('../../../config');
const container = require('../../container')({config})
const {
  dbService, 
  tokenService,
  personRoot: Person,
  organizationRoot: Organization,
  personRepository,
  organizationRepository,
} = container.cradle


function truncateAll() {
  return dbService.getTableNames().map(name => dbService.raw(`TRUNCATE TABLE ${name} CASCADE`))
}

async function initMockApp() {
  const personId = uuid();
  const organizationId = uuid();
  const testOrganization = {
    id: organizationId,
    name: 'testOrganization'
  }
  const testPerson = Person({
    id: personId,
    firstName: 'test',
    lastName: 'person',
    email: 'test@tester.com',
    login: {
      id: personId,
      password: 'test',
    }
  })

  await truncateAll()
  const organization = await organizationRepository.save(testOrganization)
  const person = await personRepository.save(testPerson)
  const accessToken = await tokenService.createAccessToken(personId)

  return {person, organization, accessToken}
}


module.exports = {container, truncateAll, initMockApp};
