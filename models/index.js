const {Usuarios} = require('./usuariosModel');
const {Sucursales} = require('./sucursalesModel');
const {Repartidores} = require('./repartidoresModel');
const {Productos} = require('./productosModel');
const {Pedidos} = require('./pedidosModel');
const {Locales} = require('./localesModel');
const {Direcciones} = require('./direccionesModel');
const {Detalle_Pedido} = require('./detalles_pedidosModel');
const {Categorias} = require('./categoriasModel');


Usuarios.hasMany(Direcciones, {foreignKey: 'Id_Usuario'});
Direcciones.belongsTo(Usuarios, {foreignKey: 'Id_Usuario'});


Usuarios.hasMany(Pedidos, {foreignKey: 'Id_Usuario'});
Pedidos.belongsTo(Usuarios, {foreignKey: 'Id_Usuario'});

/* Se cambia la relacion a 1 direccion muchos pedidos */
Pedidos.belongsTo(Direcciones, {foreignKey: 'Id_Direccion'});
Direcciones.hasMany(Pedidos, {foreignKey: 'Id_Direccion'});

Pedidos.belongsTo(Repartidores, {foreignKey: 'Id_Repartidor'});
Repartidores.hasMany(Pedidos, {foreignKey: 'Id_Repartidor'});


Detalle_Pedido.belongsTo(Pedidos, { foreignKey: 'Id_Pedido' });
Pedidos.hasMany(Detalle_Pedido, { foreignKey: 'Id_Pedido' });


Detalle_Pedido.belongsTo(Productos, { foreignKey: 'Id_Producto' });
Productos.hasMany(Detalle_Pedido, { foreignKey: 'Id_Producto' });

// 🛠️ CORREGIDO: Un producto pertenece a una categoría, una categoría tiene muchos productos
Productos.belongsTo(Categorias, {foreignKey: 'Id_Categoria'});
Categorias.hasMany(Productos, {foreignKey: 'Id_Categoria'});


Productos.belongsTo(Locales, {foreignKey: 'Id_Local'});
Locales.hasMany(Productos, {foreignKey: 'Id_Local'});

// 🛠️ CORREGIDO: Se unificó 'Id_Local' con 'L' mayúscula en ambos lados
Sucursales.belongsTo(Locales, {foreignKey: 'Id_Local'});
Locales.hasMany(Sucursales, {foreignKey: 'Id_Local'});


module.exports = {
    Usuarios,
    Sucursales,
    Repartidores,
    Productos,
    Pedidos,
    Locales,
    Direcciones,
    Detalle_Pedido,
    Categorias
};