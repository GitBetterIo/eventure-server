
module.exports = ({personRepository}) => id => {
  return personRepository.get(id)
}

