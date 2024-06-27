const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Activesession extends Model {}

Activesession.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: { model: 'users', key: 'id' },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'activesession'
})

module.exports = Activesession