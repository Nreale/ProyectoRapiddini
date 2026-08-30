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

const postAgregarPermiso = async (req, res) => {
    try {
        const Entidad = req.params.Entidad
        const Action = req.params.Action 

        if (!Entidad || !Action) {
            return res.status(400).json({message: "Faltan parametros"})
        }
        
        await Permisos.create({
            Entidad,
            Action
        })

        res.status(201).json({message: "Permiso creado correctamente"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const deletedBorrarPermiso = async (req, res) => {
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({message: "Faltan parametros"})
        }

        await Permisos.destroy({
            where: {
                id
            }
        })

        res.status(200).json({message: "Borrado correcto"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}
module.exports = {
    getMostrarPermisos,
    postAgregarPermiso,
    deletedBorrarPermiso
}