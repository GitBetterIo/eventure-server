module.exports = ({personRepository, personRoot: Person}) => async (organizationId, personData) => {
  const personId = personData.id

  if (!personId) throw new Error(`Cannot update a person without an id`)

  const person = await personRepository.get(organizationId, personId)

  person.updateName(personData)

  if (person.email !== personData.email) person.updateEmail(personData)
  if (person.birthDate !== personData.birthDate) person.updateBirthDate(personData)

  return personRepository.save(person)
}
