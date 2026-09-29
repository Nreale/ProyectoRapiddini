const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Roles = sequelize.define('Roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = {
    Roles
};