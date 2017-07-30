const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (config, userService) => {

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
    { usernameField: 'email' },
    (email, password, done) => {
      userService.findByEmail(email.toLowerCase())
        .then(user => {
          if (!user) return done(null, false, { msg: `Email ${email} not found.` });
          if (!user.matchPassword(password)) return done(null, false, { msg: 'Invalid email or password.' });

          return done(null, user);
        })
        .catch(done)
    }
  ));





  return {
    passport,
    authenticateLocal: () => passport.authenticate('local', { session: false }),
    isAuthenticated: () => (req, res, next) => {
      if (req.isAuthenticated()) return next();
      const err = new Error('Not Authenticated');
      err.status = 401;
      return next(err);
    },
  };


}




const serializeUser = (req, res, next) => {
  req.user = {id: req.user.id};
  next();
}
