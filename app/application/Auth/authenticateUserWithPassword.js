
module.exports = ({personReadService, personRoot: Person, errors}) => async (email, password) => {
  try {
    const personData = await personReadService.findLoginByEmail(email);

    if (!personData)  throw new errors.AuthenticationError()

    const person = Person(personData)

    if (!person.matchPassword(password)) throw new errors.AuthenticationError();
    
    return person;
  } catch(err) {
    const authErr = new errors.AuthenticationError(err.message);
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log(err.stack)
    // }
    throw authErr
  }
}

