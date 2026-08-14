const { sequelize } = require('../config/db.js');
const { DataTypes, Model } = require('sequelize');

const Usuarios = sequelize.define('Usuarios', {
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
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    
}, {
    tableName: 'usuarios',
    timestamps: true
});

module.exports = {
    Usuarios
};