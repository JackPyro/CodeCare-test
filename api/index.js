import express from 'express'
import morgan from 'morgan'
import config from '../config'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import bodyParser from 'body-parser'
import routes from './routes/index'

const app = express()

function run () {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(session({
    secret: 'test',
    saveUninitialized: true,
    resave: false,
  }))
  app.use(morgan('combined'))
  app.use(passport.initialize())
  app.use(passport.session())

  require('./passport')

  mongoose.connect('mongodb://localhost:27017/events')
  if (config.API) {
    routes.map(route => {
      console.info(`adding ${route.name}`)
      app.use(`/api/${route.name}`, route.module)
    })
    app.listen(config.API, err => {
      if (err) {
        console.error(err.message)
      }
      console.info('API is running on port %s', config.API)
      console.info(
        'Send requests to http://%s:%s',
        config.HOST,
        config.API
      )
    })
  } else {
    console.error(
      '==>     ERROR: No PORT environment variable has been specified'
    )
    console.log('config', config)
  }

  app.use(function (req, res, next) {
    throw new Error('404')
  })
}

run()