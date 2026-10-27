const { calcularDVH } = require('../middleware/DVH'); // Ajusta la ruta si DVH.js está en otra carpeta (ej: './utils/DVH')

const {Usuarios} = require('./usuariosModel');
const {Sucursales} = require('./sucursalesModel');
const {Repartidores} = require('./repartidoresModel');
const {Productos} = require('./productosModel');
const {Pedidos} = require('./pedidosModel');
const {Locales} = require('./localesModel');
const {Direcciones} = require('./direccionesModel');
const {Carritos} = require('./carritosModel');
const {Categorias} = require('./categoriasModel');
const {Permisos} = require('./permisosModel');
const {Roles} = require('./rolesModel');
const {Vendedores} = require('./vendedoresModel');
const {LicenciasConducir} = require('./licencia_conducirModel');
const {RolesUsuario} = require('./roles_usuariosModel');


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

Carritos.belongsTo(Pedidos, { foreignKey: 'Id_Pedido' });
Pedidos.hasMany(Carritos, { foreignKey: 'Id_Pedido' });

Carritos.belongsTo(Productos, { foreignKey: 'Id_Producto' });
Productos.hasMany(Carritos, { foreignKey: 'Id_Producto' });

Productos.belongsTo(Categorias, {foreignKey: 'Id_Categoria'});
Categorias.hasMany(Productos, {foreignKey: 'Id_Categoria'});

Productos.belongsTo(Locales, {foreignKey: 'Id_Local'});
Locales.hasMany(Productos, {foreignKey: 'Id_Local'});

Sucursales.belongsTo(Locales, {foreignKey: 'Id_Local'});
Locales.hasMany(Sucursales, {foreignKey: 'Id_Local'});

Vendedores.hasMany(Locales, { foreignKey: 'Id_Vendedor' });
Locales.belongsTo(Vendedores, { foreignKey: 'Id_Vendedor' });

Permisos.belongsToMany(Roles, { through: 'Permisos_Roles', foreignKey: 'Id_Permisos', otherKey: 'Id_Rol' });
Roles.belongsToMany(Permisos, { through: 'Permisos_Roles', foreignKey: 'Id_Rol', otherKey: 'Id_Permisos' });

Roles.belongsToMany(Usuarios, { through: RolesUsuario, foreignKey: 'Id_Rol', otherKey: 'Id_Usuario' });
Usuarios.belongsToMany(Roles, { through: RolesUsuario, foreignKey: 'Id_Usuario', otherKey: 'Id_Rol' });

Permisos.belongsToMany(Usuarios, { through: 'PermisosUsuarios', foreignKey: 'Id_Permisos', otherKey: 'Id_Usuario' });
Usuarios.belongsToMany(Permisos, { through: 'PermisosUsuarios', foreignKey: 'Id_Usuario', otherKey: 'Id_Permisos' });

Repartidores.hasMany(LicenciasConducir, { foreignKey: 'ID_Repartidor' });
LicenciasConducir.belongsTo(Repartidores, { foreignKey: 'ID_Repartidor' });


// ==========================================
// AUTOMATIZACIÓN DE HOOKS PARA EL DVH
// ==========================================
const todosLosModelos = {
    Usuarios,
    Sucursales,
    Repartidores,
    Productos,
    Pedidos,
    Locales,
    Direcciones,
    Carritos,
    Categorias,
    Vendedores,
    Roles,
    Permisos,
    LicenciasConducir,
    RolesUsuario
};

Object.values(todosLosModelos).forEach((model) => {
    // Si el modelo tiene definida la columna 'dvh', le inyectamos los ganchos automáticamente
    if (model && model.rawAttributes && model.rawAttributes.dvh) {
        model.addHook('beforeCreate', (instance) => {
            instance.dvh = calcularDVH(instance.dataValues);
        });
        model.addHook('beforeUpdate', (instance) => {
            instance.dvh = calcularDVH(instance.dataValues);
        });
    }
});


module.exports = todosLosModelos;