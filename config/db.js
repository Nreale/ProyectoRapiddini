const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('proyecto_rappidinidelivirini', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});

module.exports = { sequelize };