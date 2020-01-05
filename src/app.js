import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import * as Sentry from '@sentry/node'

import { sequelize } from './models'

// ROUTES
import { api, auth } from './routes'

const app = express()
const port = process.env.PORT || 8000

Sentry.init({ dsn: process.env.SENTRY_DSN })

// ROUTES
app.use('/api', api)
app.use('/auth', auth)

// MIDDLEWARE
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

// CORS
app.use(cors())

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// SESSION
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
  sessionConfig.cookie.secure = true
}

app.use(session(sessionConfig))

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Now listening on ${port}`))
})

export default app
