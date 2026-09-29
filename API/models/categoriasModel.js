const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Categorias = sequelize.define('Categorias', {
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
    }
    
}, {
    tableName: 'categorias',
    timestamps: false
});

module.exports = {
    Categorias
};