import passport from 'passport'
import User from './models/user'
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username, password)
    User.findOne({username: username})
      .then((user) => {
        console.log(user.isValidPassword(password))
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