const { Roles, Permisos } = require('../models/index.js');

const getMostrarRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll({
            include: {
                model: Permisos
            }
        })
        if (roles.length === 0) {
            return res.status(200).json("No hay roles creados")
        }
        res.status(200).json(roles)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const CrearRol = async (req, res) => {
    try {
        const {nombre} = req.body

        if (!nombre) {
            return res.status(400).json({message: "Parametros incompletos"})
        }
        const rol = await Roles.findOne({
            where: {
                nombre
            }
        })

        if (rol) {
            res.status(401).json({message: "Ese rol ya existe"})
        }

        const nuevorol = await Roles.create({
            nombre
        })

        res.status(201).json({message: "Rol creado"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const BorrarRol = async (req, res) => {
    try {
        const {nombre} = req.body

        if (!nombre) {
            return res.status(400).json({message: "Parametros incompletos"})
        }
        const rol = await Roles.findOne({
            where: {
                nombre
            }
        })

        if (!rol) {
            res.status(401).json({message: "Ese rol no existe"})
        }

        await rol.destroy();

        res.status(201).json({message: "Rol Borrado"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const AsignarRol = async (req, res) => {
    try {
        const {email, nombre_rol} = req.body

        if (!email && !nombre_rol) {
            return res.status(400).json({message: "Parametros incompletos"})
        }
        const usuario = await Usuarios.findOne({
            where: {
                email
            }
        })

        if (!usuario) {
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        const rol = await Roles.findOne({
            where: {
                nombre: nombre_rol
            }
        })

        if (!rol) {
            return res.status(404).json({message: "Rol no encontrado"})
        }

        await usuario.addRol(rol)

        res.status(200).json({message: "Rol asignado correctamente"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    CrearRol,
    BorrarRol,
    AsignarRol,
    getMostrarRoles
}