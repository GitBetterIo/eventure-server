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
  passport.use(new LocalStrategy(
    async (username, password, done) => {

      /**
       * OPTION 1
       */
      // authService.authenticateUserWithPassword(username, password)
      //   .then(user => {
      //     if (!user) return done(null, false, {message: 'Invalid username or password.'})
      //     return done(null, user);
      //   })
      //   .catch(err => done(err))


      /**
       * OPTION 2
       */

      try {
        const userLogin = await authService.authenticateUserWithPassword(username, password);
        done(null, userLogin);
      } catch (err) {
        done(err);
      }



      /**
       * OPTION 3
       */
      // userService.findByUsername(username)
      //   .then(user => {
      //     if (!user) {
      //       return done(null, false, { msg: `User ${username} not found.` });
      //     }
      //     if (!userService.passwordMatches(password, user)) {
      //       return done(null, false, { msg: 'Invalid username or password.' });
      //     }
      //
      //     return done(null, user);
      //   })
      //   .catch(done)
    }
  ));

  passport.use(new BearerStrategy(
    {passReqToCallback: true},
    async function(req, token, done) {

      req.token = token;


      try {
        const userLogin = await authService.authenticateUserWithToken(token);
        done(null, userLogin);
      } catch(err) {
        done(err);
      }

    }
  ));





  return passport;

}
