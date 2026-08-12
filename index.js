const express = require("express");
const { sequelize } = require('./config/db.js');

const server = express();
server.use(express.json());

server.listen(3000, async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log("Conexión exitosa a la Base de Datos");
            console.log("El servidor está ON en el puerto 3000");
        } catch (error) {
            console.error("Error al iniciar el servidor o DB:", error);
        }
});