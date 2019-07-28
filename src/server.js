const dotenv = require('dotenv')

// setup dotenv config
dotenv.config({ path: '.env' })

const mongoose = require('mongoose')

// import our application
const app = require('./app')
const port = process.env.PORT || 8000

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
mongoose.connection.on('error', err => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})
mongoose.connection.once('open', () => console.log('Connected to MongoDB'))

// Import our models
require('./models/User')
require('./models/Macro')

app.set('port', port)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
})
