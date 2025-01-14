import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('account', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'user',
      key: 'id'
    },
    allowNull: false
  },
  currencyId: {
    type: DataTypes.UUID,
    references: {
      model: 'currency',
      key: 'id'
    },
    allowNull: false
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'account',
  timestamps: true
})
