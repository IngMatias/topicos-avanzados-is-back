import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('Account', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'account',
  timestamps: true
})
