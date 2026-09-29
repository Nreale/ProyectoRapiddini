const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Direcciones = sequelize.define('Direcciones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    calle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,  
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edificio: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    timbre: {
        type: DataTypes.INTEGER,
        allowNull: true
  }
}, {
  tableName: 'DIRECCION',
  timestamps: false
});

module.exports = {
    Direcciones
};