const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = ({userService}) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    userService.findById(id, (err, user) => {
      done(err, user);
    });
  });

  /**
  * Sign in using Email and Password.
  */
  passport.use(new LocalStrategy(
    (username, password, done) => {
      userService.findByUsername(username)
        .then(user => {
          if (!user) {
            return done(null, false, { msg: `User ${username} not found.` });
          }
          if (!userService.passwordMatches(password, user)) {
            return done(null, false, { msg: 'Invalid username or password.' });
          }

          return done(null, user);
        })
        .catch(done)
    }
  ));




  return passport;

}
