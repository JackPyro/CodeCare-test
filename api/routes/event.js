import express from 'express'
import User from '../models/User'
import Event from '../models/Event'
let router = express.Router()

router.get('/', (req, res, next) => {
  if (!req.user) {
    res.send({error: 'Error'})
  } else {
    Event.find({userId: req.user._id}).then(events => {
      res.send({events: events})
    })
  }
})

router.get('/export', (req, res, next) => {

  if (!req.user) {
    res.send('No access')
  }

  Event.find({userId: req.user._id}).sort({start: -1}).select({startTime: 0, endTime: 0, __v: 0, _id: 0, userId: 0})
    .then((events) => {
      let exportFile = `//'start' and 'duration' are measured in minutes
//'start: 0' is 8:00a
${JSON.stringify(events, null, 2)}`
      res.setHeader('Content-type', 'application/octet-stream')
      res.setHeader('Content-disposition', 'attachment; filename=file.json')
      res.send(exportFile)
    })

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
      res.send({error: 'Error occurred'})
    }
  }).catch(err => res.send({error: err}))
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Event.findOneAndRemove({userId: req.user._id, _id: id}).then((data) => {
    if (data) {
      res.send({id: data._id})
    }
    else {
      res.send({error: 'Error occurred'})
    }
  })
})

export default router