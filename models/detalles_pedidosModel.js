const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

const Detalle_Pedido = sequelize.define('Detalle_Pedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
}, {
    tableName: 'detalle_pedido',
    timestamps: false
});

module.exports = {
    Detalle_Pedido
};