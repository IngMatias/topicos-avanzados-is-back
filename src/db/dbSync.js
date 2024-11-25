import sequelize from './dbConnection.js'

export const dbSync = async () => {
  try {
    await sequelize.sync({ force: true, alter: process.env.DB_ALTER })
    console.log('Syncronized DB using Sequelize')
  } catch (err) {
    console.error('Error synchronizing DB:', err)
  }
}
