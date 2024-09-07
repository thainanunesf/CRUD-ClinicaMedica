const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Paciente = sequelize.define('Paciente', {
  CPF: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: {
      is: /^[0-9]{11}$/, // Valida CPF com 11 dígitos
    },
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataConsulta: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    format: 'DD-MM-YYYY',
  },
  horaConsulta: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'paciente',
  timestamps: false,
});

module.exports = Paciente;
