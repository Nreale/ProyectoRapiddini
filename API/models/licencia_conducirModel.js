const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');
const { calcularDVH } = require('../middleware/DVH');

const LicenciasConducir = sequelize.define('Licencias_Conducir', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha_emision: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,  
    },
    Tipo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    ID_Repartidor: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    tableName: 'Licencias_Conducir',
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
    LicenciasConducir
};