const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = ({authService}) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const {SUCCESS, ERROR} = authService.deserializeUser.outputs;
    authService.deserializeUser(id)
      .on(SUCCESS, user => done(null, user))
      .on(ERROR, err => done(err, null))
      .execute();
  });

  /**
  * Sign in using Email and Password.
  */
  passport.use(new LocalStrategy(
    (username, password, done) => {

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
      const {SUCCESS, FAILURE, ERROR} = authService.authenticateUserWithPassword.outputs;
      const authenticate = authService.authenticateUserWithPassword(username, password);
      authenticate
        .on(SUCCESS, user => done(null, user))
        .on(FAILURE, reason => done(null, false, {message: reason}))
        .on(ERROR, err => done(err))
      authenticate.execute();



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
    function(req, token, done) {

      req.token = token;

      const {SUCCESS, FAILURE, ERROR} = authService.authenticateUserWithToken.outputs;
      const authenticate = authService.authenticateUserWithToken(token);
      authenticate
        .on(SUCCESS, user => done(null, user))
        .on(FAILURE, reason => done(null, false, {message: reason}))
        .on(ERROR, err => done(err))
      authenticate.execute();

      // userService.findByToken(token)
      //   .then(user => {
      //     if (!user) { return done(null, false, { msg: `token not found.` }); }
      //     return done(null, user, { scope: 'all' });
      //   })
      //   .catch(done);
    }
  ));





  return passport;

}
