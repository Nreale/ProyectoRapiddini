const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const PermisosUsuarios = sequelize.define('Permisos_Usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DVH: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Id_Permisos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Permisos_Usuarios',
    timestamps: false
});

module.exports = {
    PermisosUsuarios
};