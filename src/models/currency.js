import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('currency', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'currency',
  timestamps: true
})
