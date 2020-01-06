import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import * as Sentry from '@sentry/node'

// MODELS
import { sequelize } from './models'

// CONFIG
import passportConfig from './config/passport'

// ROUTES
import { api, auth } from './routes'

const app = express()
const port = process.env.PORT || 8000

passportConfig(passport)

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

// MIDDLEWARE
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

// CORS
app.use(cors())

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// ROUTES
app.use('/api', api)
app.use('/auth', auth)

app.listen(port, () => console.log(`Now listening on ${port}`))

// sync database
sequelize
  .sync()
  .then(() => {
    console.log('Connected to database successfully')
  })
  .catch(err => {
    console.log(err, 'Something went wrong')
  })

export default app
