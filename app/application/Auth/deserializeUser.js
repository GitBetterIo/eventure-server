
module.exports = ({userRepository}) => serializedUser => {
  const id = serializedUser;
  return userRepository.get(id)
}

