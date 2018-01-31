import express from 'express'
import passport from 'passport'
import User from '../models/user'

let router = express.Router()

router.get('/', (req, res, next) => {
  res.json({status: true})
})

router.post('/', (req, res, next) => {
  const {username, password} = req.body

  if (!username || !password) {
    return res.send({error: 'Login failed'})
  }
  User.findOne({username: username}).then(user => {
    if (!user) {
      User.create({username, password})
        .then(newUser => {
          return res.send({user: newUser})
        })
        .catch(err => {
          return res.send({error: err})
        })
    } else {
      res.send({error: 'There is already such user. Try login'})
    }
  })

})

router.post('/login', passport.authenticate('local', {session: true}), (req, res, next) => {
  const {username, password} = req.body
  if (req.user) {
    res.send({user: req.user})
  } else {
    res.send({error: 'Error occurred'})
  }

})

export default router