const { sequelize } = require('../config/db.js');
const { DataTypes, Model } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

const Vendedores = sequelize.define('Vendedores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    CUIT: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Razon_Social: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_registro_comercial: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Columna para el DVH
    dvh: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'vendedores',
    timestamps: true,
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
    Vendedores
};