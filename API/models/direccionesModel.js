const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

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
    Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edificio: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    timbre: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // Columna para el DVH
    dvh: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'DIRECCION',
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
    Direcciones
};