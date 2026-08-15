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

DetallePedido.belongsTo(Pedido, { foreignKey: 'Id_Pedido' })
Pedido.hasMany(DetallePedido, { foreignKey: 'Id_Pedido' })

DetallePedido.belongsTo(Producto, { foreignKey: 'Id_Producto' })
Producto.hasMany(DetallePedido, { foreignKey: 'Id_Producto' })







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