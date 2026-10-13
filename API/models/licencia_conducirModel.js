const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const LicenciasConducir = sequelize.define('Licencias_Conducir', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha_emision: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,  
    },
    Tipo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ID_Repartidor: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
  tableName: 'Licencias_Conducir',
  timestamps: false
});

module.exports = {
    LicenciasConducir
};