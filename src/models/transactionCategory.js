import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('transactionCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.UUID,
    references: {
      model: 'transaction',
      key: 'id'
    },
    allowNull: false
  },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: 'category',
      key: 'id'
    },
    allowNull: false
  }
}, {
  tableName: 'transactionCategory',
  timestamps: true
})
