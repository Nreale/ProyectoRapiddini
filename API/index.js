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

const {Locales} = require('./models/localesModel.js');
const {Categorias} = require('./models/categoriasModel.js');

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
        await sequelize.sync({ force: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log("Conexión exitosa a la Base de Datos");
        
        if (Locales) {
            const cantidadLocales = await Locales.count();
            
            if (cantidadLocales === 0) {
                const localesPrecargados = [
                    { nombre: 'Sucursal Centro', telefono: '1123456789', estado: true, imagen: 'https://media.istockphoto.com/id/1368500085/es/foto/feliz-grupo-de-amigos-almorzando-juntos-en-un-restaurante.jpg?s=1024x1024&w=is&k=20&c=ZQhxdVss49Ff40kt10nfYRpBxfN3FIQ6_5L43XXPHdY=' },
                    { nombre: 'Local Norte', telefono: '1198765432', estado: true, imagen: 'https://media1.tenor.com/m/r5No37EXAc0AAAAd/genio.gif' },
                    { nombre: 'Punto Sur', telefono: '1144556677', estado: false, imagen: 'https://media1.tenor.com/m/04jcrBUT9LQAAAAC/islas-malbinas-argentina.gif' },
                    { nombre: 'Local Oeste', telefono: '1133221100', estado: true, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gLtIu9swl2y_X8_hBsmXVO6AOAENQFHVG0MnILGoQoq7y-9O5CA0l0iq&s=10' },
                    { nombre: 'Express Belgrano', telefono: '1155443322', estado: true, imagen: 'https://media.tenor.com/2JSQs9AVjasAAAAe/pessi-penaldo.png' },
                    { nombre: 'Sucursal Palermo', telefono: '1166778899', estado: true, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7nFioLdI3NPSLH5WuVJ-x6ncqY35_YGjjI0YaixMzyOC3iuHrqCk0zU&s=10' },
                    { nombre: 'Local San Isidro', telefono: '1177889900', estado: false, imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2EgD70NXhgQWIXqv0rH2pGY9eVbC1uQF7YhzaljEGCxmOWUZOhYLsYs&s=10' },
                    { nombre: 'Punto Recoleta', telefono: '1188990011', estado: true, imagen: 'https://pbs.twimg.com/media/HTMiNpMWkAA5DfL?format=webp&name=large' },
                    { nombre: 'Express Caballito', telefono: '1199001122', estado: true, imagen: 'https://i.redd.it/8gho4a5vpzez.jpg' },
                    { nombre: 'Local Ramos Mejía', telefono: '1100112233', estado: false, imagen: 'https://upload.wikimedia.org/wikipedia/commons/2/25/The_Krusty_Krab.png?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=original' }
                ];

                await Locales.bulkCreate(localesPrecargados);
                console.log("Se han precargado 10 locales de prueba");
            }
        }

        if (Categorias) {
            const cantidadCategorias = await Categorias.count();

            if (cantidadCategorias === 0) {
                const categoriasPrecargadas = [
                    { nombre: 'Hamburguesas', descripcion: 'Las mejores hamburguesas artesanales', imagen: 'https://preview.redd.it/whats-even-meant-by-the-krabby-patty-secret-formula-v0-tcqq5cw60twe1.jpeg?auto=webp&s=7d4c9189fa6db25db7ef89ab4423cd8f5227e4e3' },
                    { nombre: 'Pizzas', descripcion: 'Pizzas al horno de piedra', imagen: 'https://content.imageresizer.com/images/memes/pizza-cat-meme-9.jpg' },
                    { nombre: 'Bebidas', descripcion: 'Bebidas frías y jugos naturales', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVq2-hsYMwaHOQ4X4ksoBmY1T1X2ciiP9vHv4aGclYOKsThlgSU97Khb8&s=10' },
                    { nombre: 'Postres', descripcion: 'Dulces, helados y repostería', imagen: 'https://i.pinimg.com/736x/f0/eb/68/f0eb688b1c47ec15a0c7e06240649a9f.jpg' },
                    { nombre: 'Empanadas', descripcion: 'Empanadas criollas tradicionales', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZfdi-o4MRMXigxapej44NYUgtSPt3eg2uzlyKEcpbUdw42TsefL__pBE&s=10' },
                    { nombre: 'Sushi', descripcion: 'Piezas de sushi y rolls frescos', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyrQxu40HF0-87qG4MQZhNuou-M2HgVgloB5jAN1caGCYADRIyukOlYag&s=10' }
                ];

                await Categorias.bulkCreate(categoriasPrecargadas);
                console.log("Se han precargado 6 categorias de prueba");
            }
        }

        console.log("El servidor está ON en el puerto 3000");
    } catch (error) {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.error("Error al iniciar el servidor o DB:", error);
    }
});