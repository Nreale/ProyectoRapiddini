const { sequelize } = require('../config/db.js');
const { DataTypes, Model } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH'); // 1. Importas tu función DVH

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
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    genero: {
        type: DataTypes.ENUM('Masculino', 'Femenino', 'Otro'),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    codigo_recuperacion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expiracion_codigo: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dvh: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
    
}, {
    tableName: 'usuarios',
    timestamps: true,
    // 3. Agregamos los hooks para que calcule y guarde el DVH automáticamente
    hooks: {
        beforeCreate: (usuario) => {
            const datos = usuario.toJSON();
            usuario.dvh = calcularDVH(datos);
        },
        beforeUpdate: (usuario) => {
            const datos = usuario.toJSON();
            usuario.dvh = calcularDVH(datos);
        }
    }
});

module.exports = {
    Usuarios
};