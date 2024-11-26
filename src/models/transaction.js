import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('transaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  accountId: {
    type: DataTypes.UUID,
    references: {
      model: 'account',
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
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM,
    values: ['IN', 'OUT'],
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'transaction',
  timestamps: true
})
