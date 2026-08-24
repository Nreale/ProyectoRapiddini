const { sequelize } = require('../config/db.js');
const { DataTypes, Model } = require('sequelize');

const Vendedores = sequelize.define('Vendedores', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
        
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
    }
    
}, {
    tableName: 'vendedores',
    timestamps: true
});

module.exports = {
    Vendedores
};