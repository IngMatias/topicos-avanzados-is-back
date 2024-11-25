/* eslint-env jest */

import sequelize from './src/db/dbConnection.js'
import { server } from './index.js'

beforeEach(async () => {
  await sequelize.truncate()
})

afterAll(async () => {
  await sequelize.drop({ onDelete: 'CASCADE' })
  server.close()
})

it('always pass test', () => {
  expect(true).toBe(true)
})
