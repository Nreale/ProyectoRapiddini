const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('rappidinidelivirini', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false 
});

module.exports = { sequelize };