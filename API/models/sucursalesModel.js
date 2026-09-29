const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Sucursales = sequelize.define('Sucursales', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    }
    
}, {
    tableName: 'sucursales',
    timestamps: false
});

module.exports = {
    Sucursales
};