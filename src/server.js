require('dotenv').config()

// PORT
const PORT = process.env.PORT || 8000
const app = require('./app')

app.set('port', PORT)

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
})
