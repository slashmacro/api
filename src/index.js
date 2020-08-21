const express = require('express')
const morgon = require('morgan')
const helmet = require('helmet')
const yup = require('yup')
const monk = require('monk')

// initialize dotenv config
require('dotenv').config()

// connect to database
const db = monk(process.env.MONGO_URL)

// initialize app
const app = express()

// app middleware
app.use(helmet())
app.use(morgon('common'))
app.use(express.json())

// routes

// error handler
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status)
  } else {
    res.status(500)
  }

  // only send error stack back if server is not in production
  const stack = process.env.NODE_ENV === 'production' ? '🐞' : error.stack

  // respond with json
  res.json({ message: error.message, stack })
})

const port = process.env.PORT || 1337

// start app
app.listen(port, () => {
  console.info(`👩‍💻 Listening at http://localhost:${port}`)
})
