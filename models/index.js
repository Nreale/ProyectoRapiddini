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


Usuarios.hasMany(Pedidos, {foreignKey: 'Id_Usuario'})
Pedidos.belongsTo(Usuarios, {foreignKey: 'Id_Usuario'})

/*se cambia la relacion a 1 direccion muchos pedidos (varios pedidos pueden ir a una misma direccion, 
si se seguia con lo anterior se iba a aplicar unique por lo que para cada pedido se iba a tener que poner
una direccion unica)*/
Pedidos.belongsTo(Direcciones, {foreignKey: 'Id_Direccion'})
Direcciones.hasMany(Pedidos, {foreignKey: 'Id_Direccion'})

Pedidos.belongsTo(Repartidores, {foreignKey: 'Id_Repartidor'})
Repartidores.hasMany(Pedidos, {foreignKey: 'Id_Repartidor'})


Detalle_Pedido.belongsTo(Pedidos, { foreignKey: 'Id_Pedido' })
Pedidos.hasMany(Detalle_Pedido, { foreignKey: 'Id_Pedido' })


Detalle_Pedido.belongsTo(Productos, { foreignKey: 'Id_Producto' })
Productos.hasMany(Detalle_Pedido, { foreignKey: 'Id_Producto' })

Categorias.belongsTo(Productos, {foreignKey: 'Id_Categoria'})
Productos.hasMany(Categorias, {foreignKey: 'Id_Categoria'})


Productos.belongsTo(Locales, {foreignKey: 'Id_Local'})
Locales.hasMany(Productos, {foreignKey: 'Id_Local'})

Sucursales.belongsTo(Locales, {foreignKey: 'Id_local'})
Locales.hasMany(Sucursales, {foreignKey: 'Id_Local'})


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
}