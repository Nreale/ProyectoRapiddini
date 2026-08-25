const { Usuarios } = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getBuscarUsuario = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json({mensaje: "Falta el id"})
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

        res.status(200).json({mensaje: "Usuario encontrado", usuario: usuario})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const postRegistrarUsuario = async (req, res) => {
    try {
        const {nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero} = req.body
        const dominiosValidos = ["@gmail.com", "@bue.edu.ar", "@hotmail.com"];

        if (!nombre || !apellido || !email || !telefono || !contraseña || !fecha_nacimiento || !genero) {
            return res.status(400).json("Faltan parametros")
        }

        const cant = email.split("@").length -1;
        if (cant !== 1) {
            return res.status(400).json({mensaje: "Formato invalido", estado: false})
        }
        const tieneDominioValido = dominiosValidos.some(dominio => email.endsWith(dominio));
        if (!tieneDominioValido){
            return res.status(400).json({mensaje: "Formato incorrecto, debe ir algo antes del dominio", estado: false})
        }
        
        const usuario = await Usuarios.findOne({
            where: {
                email
            }
        })
        
        if (usuario && usuario.isActive === true) {
            return res.status(409).json({mensaje: "Este email ya esta usado", email: email})
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
            return res.status(201).json({mensaje: "Usuario creado correctamente", estado: true})
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
        
        return res.status(201).json({mensaje: "Usuario Creado Correctamente", estado: true})
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}

const deletedBorrarUsuario = async (req, res) => {
    try {

        if (req.params.id === undefined) {
            return res.status(400).json({mensaje: "Parametros incompletos"})
        }
        
        const usuario = await Usuarios.findByPk(Number(req.params.id))

        if (!usuario) {
            return res.status(404).json({mensaje: "Usuario no encontrado", estado: false})
        }

        usuario.isActive = false
        await usuario.save()

        res.status(200).json({mensaje: "Usuario borrado correctamente", estado: true})
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero } = req.body;

        const usuario = await Usuarios.findByPk(Number(id));
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado", estado: false });
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
                return res.status(409).json({ mensaje: "El nuevo email ya está en uso", estado: false });
            }
            datosActualizar.email = email;
        }

        if (contraseña) {
            datosActualizar.contraseña = await bcrypt.hash(contraseña, 12);
        }

        await usuario.update(datosAActualizar);

        return res.status(200).json({mensaje: "Modificado correctamente",estado: true});

    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
};

const getIniciarSesion = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usuarios.findOne({where: {email: email}})
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const payload = { username: user.username, isActive: true };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login correcto', token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { 
    patchModificarUsuario,
    deletedBorrarUsuario,
    postRegistrarUsuario,
    getBuscarUsuario,
    getIniciarSesion
};