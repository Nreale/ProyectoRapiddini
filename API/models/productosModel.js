const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Productos = sequelize.define('Productos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
    
    
}, {
    tableName: 'productos',
    timestamps: false
});

module.exports = {
    Productos
};