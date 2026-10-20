const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const RolesUsuario = sequelize.define('Roles_Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DVH: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Id_Rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Roles_Usuario',
    timestamps: false
});

module.exports = {
    RolesUsuario
};