const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Permisos = sequelize.define('Roles', {
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
    tableName: 'roles',
    timestamps: false
});

module.exports = {
    Permisos
};