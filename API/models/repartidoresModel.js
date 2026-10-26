const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

const Repartidores = sequelize.define('Repartidores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vehiculo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
        
    },
    nacionalidad: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
    tableName: 'repartidores',
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
    Repartidores
};