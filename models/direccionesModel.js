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
    
}, {
    tableName: 'direcciones',
    timestamps: false
});

module.exports = {
    Direcciones
};