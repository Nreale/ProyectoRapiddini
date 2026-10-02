const express = require("express");
const { sequelize } = require('./config/db.js');
const ProductoRoutes = require('./routers/ProductosRoutes.js');
const UsuarioRoutes = require('./routers/UsuarioRoutes.js');
const DireccionRoutes = require('./routers/DireccionRoutes.js')
const SucursalRoutes =require('./routers/SucursalesRoutes.js')
const RolesRoutes = require('./routers/RolesRoutes.js');
const PermisosRoutes = require('./routers/PermisosRotes.js');
const server = express();
server.use(express.json());

server.use('/Producto', ProductoRoutes);
server.use('/Usuario', UsuarioRoutes);
server.use('/Direccion', DireccionRoutes);
server.use('/Sucursal', SucursalRoutes)
server.use('/Roles', RolesRoutes)
server.use('/Permisos', PermisosRoutes)

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