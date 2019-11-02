const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// BODYPARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS
app.use(cors())

module.exports = app
