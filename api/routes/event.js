import express from 'express'
import User from '../models/User'
import Event from '../models/Event'
let router = express.Router()

router.get('/', (req, res, next) => {
  if (!req.user) {
    res.send({error: 'Error'})
  } else {
    Event.find({userId: req.user._id}).then(events => {
      res.send({events})
    })
  }
})

router.post('/:id', (req, res, next) => {
  const event = req.body
  const id = req.params.id
  User.findOne({_id: id}).then(user => {
    if (user) {
      Event.create({
        ...event,
        userId: user._id
      }).then(event => {
        res.send({event})
      }).catch(err => res.send({error: err}))
    } else {
      res.send({error: 'Error occured'})
    }
  }).catch(err => res.send({error: err}))
})

export default router