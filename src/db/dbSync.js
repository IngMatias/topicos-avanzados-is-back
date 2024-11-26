import user from '../models/user.js'
import currency from '../models/currency.js'
import account from '../models/account.js'
import category from '../models/category.js'
import transaction from '../models/transaction.js'
import transactionCategory from '../models/transactionCategory.js'
import sequelize from './dbConnection.js'

export const dbSync = async () => {
  try {
    await sequelize.sync({ force: false, alter: process.env.DB_ALTER })
    console.log('Syncronized DB using Sequelize')

   /*  await user.bulkCreate([
      {
        firstName: 'Matias',
        lastName: 'Hernandez',
        username: 'mhernandez'
      }
    ])

    await currency.bulkCreate([
      {
        name: 'PESO URUGUAYO'
      }
    ]) */

  } catch (err) {
    console.error('Error synchronizing DB:', err)
  }
}
