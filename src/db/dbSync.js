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
