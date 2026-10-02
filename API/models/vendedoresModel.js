const { sequelize } = require('../config/db.js');
const { DataTypes, Model } = require('sequelize');

const Vendedores = sequelize.define('Vendedores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CUIT: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Razon_Social: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_registro_comercial: {
        type: DataTypes.DATETIME,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'vendedores',
    timestamps: true
});

module.exports = {
    Vendedores
};