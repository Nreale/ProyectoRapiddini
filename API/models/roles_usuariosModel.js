const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

const RolesUsuario = sequelize.define('Roles_Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dvh: {
        type: DataTypes.STRING(255),
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
    timestamps: false,
    hooks: {
        beforeCreate: (instancia) => {
            instancia.dvh = calcularDVH(instancia);
        },
        beforeUpdate: (instancia) => {
            instancia.dvh = calcularDVH(instancia);
        }
    }
});

module.exports = {
    RolesUsuario
};