const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');
const Carritos = sequelize.define('Carritos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Id_Pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Columna para el DVH
    dvh: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'carritos',
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
    Carritos
};