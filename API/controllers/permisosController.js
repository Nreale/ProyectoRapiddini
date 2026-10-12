const { Permisos} = require('../models/index.js');

const getMostrarPermisos = async (req, res) => {
    try {
        const permisos = await Permisos.findAll()
        if (permisos.length === 0) {
            return res.status(200).json({message: "No hay permisos creados"})
        }
        
        res.status(200).json({message: "Permisos", permisos})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
        
}

const CrearPermiso = async (req, res) => {
    try {
        const {entidad, action} = req.body

        if (!entidad && !action) {
            return res.status(400).json({message: "Parametros incompletos"})
        }

        const permiso = await Permisos.create({
            entidad,
            action
        })

        res.status(201).json({message: "Permiso creado correctamente", permiso})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const BorrarPermiso = async (req, res) => {
    try {
        const {id} = req.body

        if (!id) {
            return res.status(400).json({message: "Parametros incompletos"})
        }

        const filasBorradas = await Permisos.destroy({
            where: {
                id
            }
        })

        if (filasBorradas === 0) {
            return res.status(404).json({message: "Permiso no encontrado"})
        }

        return res.status(200).json({message: "Permiso borrado correctamente"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const AsignarPermiso = async (req, res) => {
    try {
        const {nombre_rol, id} = req.body

        if (!id && !nombre_rol) {
            return res.status(400).json({message: "Parametros incompletos"})
        }

        const permiso = await Permisos.findByPk(id)
        if (!permiso) {
            return res.status(404).json({message: "Permiso no encontrado"})
        }

        const rol = await Roles.findOne({
            where: {
                nombre: nombre_rol
            }
        })

        if (!rol) {
            return res.status(404).json({message: "Rol no encontrado"})
        }

        await rol.addPermiso(permiso)
        res.status(200).json({message: "Se asigno correctamente"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    CrearPermiso,
    BorrarPermiso,
    AsignarPermiso,
    getMostrarPermisos
}