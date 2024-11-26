import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { dbSync } from './src/db/dbSync.js'
import routes from './src/routes/index.js'

const app = express()
const port = process.env.PORT || 3000
const endpointBase = process.env.ENDPOINT_BASE

await dbSync()

app.use(cors())
app.use(bodyParser.json())
app.use(endpointBase, routes)

app.use((req, res, next) => {
  console.log('Autorization: ', req.headers.authorization)
  console.log('path: ', req.path)
  console.log('body: ', JSON.stringify(req.body))
  console.log('query: ', JSON.stringify(req.query))
  next()
})

const server = await app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

export { app, server }
