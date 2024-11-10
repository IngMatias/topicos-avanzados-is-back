import sequelize from './dbConnection.js'

export const dbSync = () => {
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Syncronized DB using Sequelize')
    })
    .catch((err) => {
      console.error('Error synchronizing DB:', err)
    })
}
