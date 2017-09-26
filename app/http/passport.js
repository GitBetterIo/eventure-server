const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = ({authService}) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {

    try {
      const user = await authService.deserializeUser(id);
      return done(null, user);
    } catch(err) {
      done(err);
    }
  });

  /**
  * Sign in using Email and Password.
  */
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        const person = await authService.authenticateUserWithPassword(username, password);
        done(null, person);
      } catch (err) {
        done(err);
      }

    }
  ));

  passport.use(new BearerStrategy(
    {passReqToCallback: true},
    async function(req, token, done) {

      req.token = token;

      try {
        const person = await authService.authenticateUserWithToken(token);
        done(null, person);
      } catch(err) {
        done(err);
      }

    }
  ));





  return passport;

}
