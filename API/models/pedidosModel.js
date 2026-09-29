const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

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
    }
    
    
}, {
    tableName: 'pedidos',
    timestamps: false
});

module.exports = {
    Pedidos
};