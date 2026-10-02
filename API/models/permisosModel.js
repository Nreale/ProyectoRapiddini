const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Permisos = sequelize.define('Permisos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Entidad: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Action: {
        type: DataTypes.ENUM('Create', 'Read', 'Update', 'Deleted'),
        allowNull: false
    }
    
}, {
    tableName: 'permisos',
    timestamps: false
});

module.exports = {
    Permisos
};