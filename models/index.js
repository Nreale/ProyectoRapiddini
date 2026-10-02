const {Usuarios} = require('./usuariosModel');
const {Sucursales} = require('./sucursalesModel');
const {Repartidores} = require('./repartidoresModel');
const {Productos} = require('./productosModel');
const {Pedidos} = require('./pedidosModel');
const {Locales} = require('./localesModel');
const {Direcciones} = require('./direccionesModel');
const {Detalle_Pedido} = require('./detalles_pedidosModel');
const {Categorias} = require('./categoriasModel');
const {Permisos} = require('./permisosModel');
<<<<<<< Updated upstream:models/index.js
const {Roles} = require('./rolesModel');
=======
const {Roles} = require('./rolesModel')

>>>>>>> Stashed changes:API/models/index.js


Usuarios.hasMany(Direcciones, {foreignKey: 'Id_Usuario'});
Direcciones.belongsTo(Usuarios, {foreignKey: 'Id_Usuario'});

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

<<<<<<< Updated upstream:models/index.js
Usuarios.belongsToMany(Roles, {through: 'Usuario_Roles', foreignKey: 'Id_Usuario', otherKey: 'Id_Rol'});
Roles.belongsToMany(Usuarios, {through: 'Usuario_Roles', foreignKey: 'Id_Rol', otherKey: 'Id_Usuario'});

Roles.belongsToMany(Permisos, {through: 'Roles_Permisos', foreignKey: 'Id_Rol', otherKey: 'Id_Permiso'});
Permisos.belongsToMany(Roles, {through: 'Roles_Permisos', foreignKey: 'Id_Permiso', otherKey: 'Id_Rol'});

Usuarios.belongsToMany(Permisos, {through: 'Usuarios_Permisos', foreignKey: 'Id_Usuario', otherKey: 'Id_Permiso'});
Permisos.belongsToMany(Usuarios, {through: 'Usuarios_Permisos', foreignKey: 'Id_Permiso', otherKey: 'Id_Usuario'});
=======
Permisos.belongsToMany(Roles, { through: Permisos_Roles, foreignKey: 'ID_Permisos_FK' });
Roles.belongsToMany(Permisos, { through: Permisos_Roles, foreignKey: 'ID_Rol_FK' });

Roles.belongsToMany(Usuarios, { through: Roles_Usuario, foreignKey: 'ID_Rol_FK' });
Usuarios.belongsToMany(Roles, { through: Roles_Usuario, foreignKey: 'ID_Usuario_FK' });

Permisos.belongsToMany(Usuarios, { through: Permisos_Usuarios, foreignKey: 'ID_Permisos_FK' });
Usuarios.belongsToMany(Permisos, { through: Permisos_Usuarios, foreignKey: 'ID_Usuario_FK' });
>>>>>>> Stashed changes:API/models/index.js

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
    Roles,
    Permisos
};