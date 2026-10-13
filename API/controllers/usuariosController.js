const { Usuarios, Roles } = require('../models/index.js');
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
        if (req.params.id === undefined) {
            return res.status(400).json({message: "Falta el id"})
        }
        const usuario = await Usuarios.findOne({
            where: {
                id: Number(req.params.id),
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
    try {
        const {nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero} = req.body

        if (!nombre || !apellido || !email || !telefono || !contraseña || !fecha_nacimiento || !genero) {
            return res.status(400).json({message: "Faltan parametros"})
        }
        
        const usuario = await Usuarios.findOne({
            where: {
                email
            }
        })
        
        if (usuario && usuario.isActive === true) {
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
            await usuario.save();
            return res.status(201).json({message: "Usuario creado correctamente", estado: true, id: usuario.id})
        }

        const rol = await Roles.findOne({
            where: {
                nombre: 'USUARIO'
            }
        })

        if (!rol) {
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
        })

        await nuevo_usuario.addRoles(rol)
        
        return res.status(201).json({message: "Usuario Creado Correctamente", estado: true, id: nuevo_usuario.id})
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}

const deletedBorrarUsuario = async (req, res) => {
    try {

        if (req.params.id === undefined) {
            return res.status(400).json({message: "Parametros incompletos"})
        }
        
        const usuario = await Usuarios.findByPk(Number(req.params.id))

        if (!usuario) {
            return res.status(404).json({message: "Usuario no encontrado", estado: false})
        }

        usuario.isActive = false
        await usuario.save()

        res.status(200).json({message: "Usuario borrado correctamente", estado: true})
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarUsuario = async (req, res) => {
    try {
        const { id } = req.user.id;
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