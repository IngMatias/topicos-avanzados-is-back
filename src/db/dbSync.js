import { getCurrenciesClient } from '../clients/currencySoapClient.js'
import { Currency, User } from '../models/index.js'
import sequelize from './dbConnection.js'

export const dbSync = async () => {
  try {
    await sequelize.sync({ force: true, alter: process.env.DB_ALTER })
    console.log('Syncronized DB using Sequelize')

    const user = await User.create(
      {
        firstName: 'Matias',
        lastName: 'Hernandez',
        username: 'mhernandez'
      }
    )
    console.log(user.id)

    const currenciesBCU = await getCurrenciesClient()

    await Currency.bulkCreate(
      [{
        name: 'PESO URUGUAYO',
        code: 0
      },
      ...currenciesBCU.map((val) => ({ name: val.name, code: val.code }))
      ]
    )
  } catch (err) {
    console.error('Error synchronizing DB:', err)
  }
}
