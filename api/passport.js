import passport from 'passport'
import User from './models/user'
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({username: username})
      .then((user) => {
        if (!user) { return done(null, false) }
        if (!user.isValidPassword(password)) { return done(null, false) }
        delete user.password
        return done(null, user)
      })
  }
))

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})