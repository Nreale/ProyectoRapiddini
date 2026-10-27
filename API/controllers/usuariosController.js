const { Usuarios, RolesUsuario, Roles, Vendedores, Repartidores, Sucursales, Productos, Pedidos, Locales} = require('../models/index.js');
const {sequelize} = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getMostrarUsuarios = async (req, res) =>{
    try {
        const usuarios = await Usuarios.findAll()
        if (usuarios.length === 0) {
            return res.status(404).json({message: "No hay usuarios"})
        }

        res.status(200).json({message: "Usuarios: ", usuarios})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getBuscarUsuario = async (req, res) => {
    try {
        if (req.user.id === undefined) {
            return res.status(400).json({message: "Falta el id"})
        }
        const usuario = await Usuarios.findOne({
            where: {
                id: Number(req.user.id),
                isActive: true
            }
        })
        if (!usuario) {
            return res.status(404).json("Usuario no encontrado")
        }

        res.status(200).json({message: "Usuario encontrado", usuario: usuario})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const postRegistrarUsuario = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero} = req.body

        if (!nombre || !apellido || !email || !telefono || !contraseña || !fecha_nacimiento || !genero) {
            await t.rollback()
            return res.status(400).json({message: "Faltan parametros"})
            
        }
    
        const usuario = await Usuarios.findOne({
            where: {
                email
            },
            transaction: t
        })
       
        if (usuario && usuario.isActive === true) {
            await t.rollback()
            return res.status(409).json({message: "Este email ya esta usado", email: email})
        }

        const hashedPassword = await bcrypt.hash(contraseña, 12);

        if (usuario && usuario.isActive === false) {
            usuario.nombre = nombre;
            usuario.apellido = apellido;
            usuario.telefono = telefono;
            usuario.contraseña = hashedPassword;
            usuario.fecha_nacimiento = fecha_nacimiento;
            usuario.genero = genero;
            usuario.isActive = true
            await usuario.save({ transaction: t });
            await t.commit();
            return res.status(201).json({message: "Usuario creado correctamente", estado: true, id: usuario.id})
        }

        const rol = await Roles.findOne({
            where: {
                nombre: 'USUARIO'
            },
            transaction: t
        })

        if (!rol) {
            await t.rollback()
            return res.status(404).json({message: "Hubo un problema", estado: true})
        }

        const nuevo_usuario = await Usuarios.create({
            nombre,
            apellido,
            email,
            telefono,
            contraseña: hashedPassword,
            fecha_nacimiento,
            genero,
            isActive: true          
        }, {transaction: t})

        await nuevo_usuario.addRoles(rol, { transaction: t });

        await Pedidos.create({
            fecha:  new Date(),
            estado: 'Pendiente',  
            total: 0,    
            metodo_pago: 'Efectivo',
            Id_Usuario: nuevo_usuario.id,
            Id_Direccion: null,      
            Id_Repartidor: null  
        }, {transaction: t});

        await t.commit();
        return res.status(201).json({message: "Usuario Creado Correctamente", estado: true, id: nuevo_usuario.id})

    } catch (error) {
        console.log(error)
        await t.rollback();
        return res.status(500).json({ error: error.message });
    }
   
} 

const deletedBorrarUsuario = async (req, res) => {
    const t = await sequelize.transaction();
    try {

        if (req.user.id === undefined) {
            return res.status(400).json({message: "Parametros incompletos"})
        }
        const id = req.user.id
        
        const usuario = await Usuarios.findByPk(id, {
            include: [{model: Roles}],
            transaction: t
        })

        if (!usuario || !usuario.isActive) {
            await t.rollback();
            return res.status(404).json({message: "Usuario no encontrado", estado: false})
        }

        const roles_lista = usuario.Roles.map(rol => rol.nombre)
        console.log(roles_lista);
        if (roles_lista.includes('VENDEDOR')) {

            const vendedor = await Vendedores.findOne({
                where: { 
                    Id_Usuario: id
                },
                transaction: t
            })

            if (vendedor || vendedor.isActive === true) {
                vendedor.isActive = false
                await vendedor.save()
                const locales = await Locales.findAll({ 
                    where: { Id_Vendedor: vendedor.id 

                    }, 
                    transaction: t
                });

                for (const local of locales) {
                    local.isActive = false;
                    await local.save();

                    await Sucursales.update(
                        { isActive: false },
                        { 
                            where: { Id_Local: local.id }
                        },
                        
                        );

                
                    await Productos.update(
                        { isActive: false },
                        { 
                            where: { Id_Local: local.id }
                        }
                    );
                }
            }
            
        }

        if (roles_lista.includes('REPARTIDOR')) {
            const repartidor = await Repartidores.findOne({
                where: { Id_Usuario: id },
                transaction: t
            });

            if (repartidor) {
                repartidor.isActive = false;
                await repartidor.save({ transaction: t });

                await Pedidos.update(
                    { Id_Repartidor: null }, // no se si poner el activo en false o sacar al repartidor para poner otro
                    { 
                        where: { 
                            Id_Repartidor: repartidor.id,
                            estado: { [Op.in]: ['Pendiente', 'En camino'] }
                        },
                        transaction: t 
                    }
                );
            }
        }
        usuario.isActive = false
        await usuario.save()

        await t.commit();
        res.status(200).json({message: "Usuario borrado correctamente", estado: true})
        
    } catch (error) {
        await t.rollback();
        console.log(error)
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarUsuario = async (req, res) => {
    try {
        const id = req.user.id;
        const { nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero } = req.body;

        const usuario = await Usuarios.findOne({
            where: {
                id,
                isActive: true
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado", estado: false });
        }

        const datosActualizar = {};

        if (nombre !== undefined) datosActualizar.nombre = nombre;
        if (apellido !== undefined) datosActualizar.apellido = apellido;
        if (telefono !== undefined) datosActualizar.telefono = telefono;
        if (fecha_nacimiento !== undefined) datosActualizar.fecha_nacimiento = fecha_nacimiento;
        if (genero !== undefined) datosActualizar.genero = genero;

        if (email && email !== usuario.email) {
            const emailExiste = await Usuarios.findOne({ where: { email } });
            if (emailExiste) {
                return res.status(409).json({ message: "El nuevo email ya está en uso", estado: false });
            }
            datosActualizar.email = email;
        }

        if (contraseña) {
            datosActualizar.contraseña = await bcrypt.hash(contraseña, 12);
        }

        await usuario.update(datosActualizar);

        return res.status(200).json({message: "Modificado correctamente",estado: true});

    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
};

const getIniciarSesion = async (req, res) => {
    try {
        const JWT_SECRET = "gbyawdywiadbwa1"
        
        const { email, password } = req.body;
        const user = await Usuarios.findOne({where: {email: email}})
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        

        const isMatch = await bcrypt.compare(password, user.contraseña);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        //const roles = await user.getRoles()
        const payload = { email: user.email, id: user.id};
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ message: 'Login correcto', token });
    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
};



module.exports = {
    getMostrarUsuarios,
    patchModificarUsuario,
    deletedBorrarUsuario,
    postRegistrarUsuario,
    getBuscarUsuario,
    getIniciarSesion,
};
