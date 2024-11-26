/* eslint-env jest */
/* import request from 'supertest'
import sequelize from './src/db/dbConnection.js'
import { app, server } from './index.js'

const userEndpoint = `${process.env.ENDPOINT_BASE}${process.env.ENDPOINT_V1}/user`

const accountEndpoint = `${process.env.ENDPOINT_BASE}${process.env.ENDPOINT_V1}/account`
const accountsEndpoint = `${process.env.ENDPOINT_BASE}${process.env.ENDPOINT_V1}/accounts`

const currencyEndpoint = `${process.env.ENDPOINT_BASE}${process.env.ENDPOINT_V1}/currency`
const currenciesEndpoint = `${process.env.ENDPOINT_BASE}${process.env.ENDPOINT_V1}/currencies` */

beforeEach(async () => {
  // await sequelize.truncate({cascade: true })
})

afterAll(async () => {
  // await sequelize.drop({ cascade: true })
  // server.close()
})

it('always pass test', () => {
  expect(true).toBe(true)
})

/* it('account creation', async () => {
  const user = await request(app)
    .post(userEndpoint)
    .send()

  const currency = await request(app)
    .post()

  const userId = user.userId
  const currencyId = ''
  const accountNumber = 'accountNumber'
  const testDescription = 'testDescription'

  await request(app)
  .post(accountEndpoint)
  .send({
    userId: ,
    currencyId: ,
    accountNumber: ,
    description: ''
  })

})
 */
