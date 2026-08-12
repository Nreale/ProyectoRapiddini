const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Locales = sequelize.define('Locales', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    
}, {
    tableName: 'locales',
    timestamps: false
});

module.exports = {
    Locales
};