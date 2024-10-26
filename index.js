const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.get('/health', (req, res) => {
  res.send('OK')
})

app.get('/env', (req, res) => {
  res.send(process.env.env)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
