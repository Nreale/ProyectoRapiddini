const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

const Pedidos = sequelize.define('Pedidos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        
    },
    estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
        
    },
    metado_pago: {
        type: DataTypes.ENUM('Efectivo', 'Tarjeta Credito', 'Tarjeta Debito', 'Billetera Virutal'),
        allowNull: false,
    },
    Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Direccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Repartidor: {
        type: DataTypes.INTEGER,
        allowNull: true // Puede ser nulo mientras se asigna repartidor
    },
    // Columna para el DVH
    dvh: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'pedidos',
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
    Pedidos
};