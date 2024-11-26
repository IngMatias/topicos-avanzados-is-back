import sequelize from '../db/dbConnection.js'
import { DataTypes } from 'sequelize'

export default sequelize.define('currencyBCU', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: {
    type: DataTypes.INTEGER,
    unique: true,
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
  tableName: 'currencyBCU',
  timestamps: true
})
