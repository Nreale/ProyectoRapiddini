const express = require("express");
const {sequelize} = require('./config/db.js');
const ProductoRoutes = require('./routers/ProductosRoutes.js');
const UsuarioRoutes = require('./routers/UsuarioRoutes.js');
const DireccionRoutes = require('./routers/DireccionRoutes.js');
const SucursalRoutes = require('./routers/SucursalesRoutes.js');
const RolesRoutes = require('./routers/RolesRoutes.js');
const PermisosRoutes = require('./routers/PermisosRotes.js');
const VendedorRoutes = require('./routers/VendedoresRoutes.js');
const RepartidorRoutes = require('./routers/RepartidoresRoutes.js');
const LocalesRoutes = require('./routers/LocalesRoutes.js');
const CategoriasRoutes = require('./routers/CategoriasRoutes.js');

const server = express();
server.use(express.json());

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

server.use('/Producto', ProductoRoutes);
server.use('/Usuario', UsuarioRoutes);
server.use('/Direccion', DireccionRoutes);
server.use('/Sucursal', SucursalRoutes);
server.use('/Roles', RolesRoutes);
server.use('/Permisos', PermisosRoutes);
server.use('/Vendedor', VendedorRoutes);
server.use('/Repartidores', RepartidorRoutes);
server.use('/Locales', LocalesRoutes);
server.use('/Categorias', CategoriasRoutes);

server.listen(3000, async () => {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
        await sequelize.authenticate();
        await sequelize.sync({});
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log("Conexión exitosa a la Base de Datos");
        

        console.log("El servidor está ON en el puerto 3000");
    } catch (error) {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.error("Error al iniciar el servidor o DB:", error);
    }
});