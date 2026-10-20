const {Usuarios} = require('./usuariosModel')
const {Sucursales} = require('./sucursalesModel')
const {Repartidores} = require('./repartidoresModel')
const {Productos} = require('./productosModel')
const {Pedidos} = require('./pedidosModel')
const {Locales} = require('./localesModel')
const {Direcciones} = require('./direccionesModel')
const {Detalle_Pedido} = require('./detalles_pedidosModel')
const {Categorias} = require('./CategoriasModel')
const {Permisos} = require('./permisosModel')
const {Roles} = require('./rolesModel')
const {Vendedores} = require('./vendedoresModel')
const {LicenciasConducir} = require('./licencia_conducirModel')
const {RolesUsuario} = require('./roles_usuariosModel'); 
const {PermisosUsuarios} = require('./permisos_usuariosModel');

Usuarios.hasMany(Direcciones, {foreignKey: 'Id_Usuario'});
Direcciones.belongsTo(Usuarios, {foreignKey: 'Id_Usuario'});

Usuarios.hasMany(Vendedores, { foreignKey: 'Id_Usuario' });
Vendedores.belongsTo(Usuarios, { foreignKey: 'Id_Usuario' });

Usuarios.hasMany(Repartidores, { foreignKey: 'Id_Usuario' });
Repartidores.belongsTo(Usuarios, { foreignKey: 'Id_Usuario' });

Usuarios.hasMany(Pedidos, {foreignKey: 'Id_Usuario'});
Pedidos.belongsTo(Usuarios, {foreignKey: 'Id_Usuario'});

Pedidos.belongsTo(Direcciones, {foreignKey: 'Id_Direccion'});
Direcciones.hasMany(Pedidos, {foreignKey: 'Id_Direccion'});

Pedidos.belongsTo(Repartidores, {foreignKey: 'Id_Repartidor'});
Repartidores.hasMany(Pedidos, {foreignKey: 'Id_Repartidor'});

Detalle_Pedido.belongsTo(Pedidos, { foreignKey: 'Id_Pedido' });
Pedidos.hasMany(Detalle_Pedido, { foreignKey: 'Id_Pedido' });

Detalle_Pedido.belongsTo(Productos, { foreignKey: 'Id_Producto' });
Productos.hasMany(Detalle_Pedido, { foreignKey: 'Id_Producto' });

Productos.belongsTo(Categorias, {foreignKey: 'Id_Categoria'});
Categorias.hasMany(Productos, {foreignKey: 'Id_Categoria'});

Productos.belongsTo(Locales, {foreignKey: 'Id_Local'});
Locales.hasMany(Productos, {foreignKey: 'Id_Local'});

Sucursales.belongsTo(Locales, {foreignKey: 'Id_Local'});
Locales.hasMany(Sucursales, {foreignKey: 'Id_Local'});

Vendedores.belongsToMany(Locales, {through: 'Vendedores_Localidades', foreignKey: 'ID_Vendedor', otherKey: 'ID_Local'});
Locales.belongsToMany(Vendedores, {through: 'Vendedores_Localidades', foreignKey: 'ID_Local', otherKey: 'ID_Vendedor'});

Permisos.belongsToMany(Roles, { through: 'Permisos_Roles', foreignKey: 'Id_Permisos', otherKey: 'Id_Rol' });
Roles.belongsToMany(Permisos, { through: 'Permisos_Roles', foreignKey: 'Id_Rol', otherKey: 'Id_Permisos' });

Roles.belongsToMany(Usuarios, { through: RolesUsuario, foreignKey: 'Id_Rol', otherKey: 'Id_Usuario' });
Usuarios.belongsToMany(Roles, { through: RolesUsuario, foreignKey: 'Id_Usuario', otherKey: 'Id_Rol' });

Permisos.belongsToMany(Usuarios, { through: PermisosUsuarios, foreignKey: 'Id_Permisos', otherKey: 'Id_Usuario' });
Usuarios.belongsToMany(Permisos, { through: PermisosUsuarios, foreignKey: 'Id_Usuario', otherKey: 'Id_Permisos' });

Repartidores.hasMany(LicenciasConducir, { foreignKey: 'ID_Repartidor' });
LicenciasConducir.belongsTo(Repartidores, { foreignKey: 'ID_Repartidor' });

module.exports = {
    Usuarios,
    Sucursales,
    Repartidores,
    Productos,
    Pedidos,
    Locales,
    Direcciones,
    Detalle_Pedido,
    Categorias,
    Vendedores,
    Roles,
    Permisos,
    LicenciasConducir
};