import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('currencyExchange', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  buy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sell: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currencyId: {
    type: DataTypes.UUID,
    references: {
      model: 'currency',
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'currencyExchange',
  timestamps: true
})
