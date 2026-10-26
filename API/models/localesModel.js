const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

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
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING
    },
    // Columna para el DVH
    dvh: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'locales',
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
    Locales
};