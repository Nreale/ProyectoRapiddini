const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Repartidores = sequelize.define('Repartidores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    vehiculo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
        
    },
    nacionalidad: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
    
}, {
    tableName: 'repartidores',
    timestamps: false
});

module.exports = {
    Repartidores
};