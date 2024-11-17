import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { dbSync } from './src/db/dbSync.js'
import allRoutesV1 from './src/routes/all.routes.v1.js'
import currencyRoutes from './src/routes/currencyRoutes.js'

const app = express()
const port = process.env.PORT || 3000
const endpointBase = process.env.ENDPOINT_BASE

dbSync()

app.use(cors())
app.use(bodyParser.json())
app.use(endpointBase, allRoutesV1)
app.use('', currencyRoutes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
