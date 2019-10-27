const dotenv = require('dotenv')

// setup dotenv config
dotenv.config({ path: '.env' })

// PORT
const PORT = process.env.PORT || 8000
const app = require('./index')

app.set('port', PORT)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
})
