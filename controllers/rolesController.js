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

const postAgregarRol = async (req, res) => {
    try {
        const nombre = req.params.nombre
        if (!nombre) {
            return res.status(400).json("Parametros incompletos")
        }
        
        const rol = await Roles.create({
            nombre
        })

        res.status(201).json({message: "Rol creado", rol})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}

const deletedBorrarRol = async (req, res) => {
    try {
        const nombre = req.params.nombre
        if (!nombre) {
            return res.status(400).json("Parametros incompletos")
        }

        const filas_borradas = await Roles.destroy({
            where: {
                nombre
            }
        })

        if (filas_borradas === 0) {
            return res.status(404).json({ message: "Rol no encontrado" });
        }

        res.status(200).json({message: "Borrado completo"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarRol = async (req, res) => {
    try {
        const nombre = req.params.nombre
        const nuevo_nombre = req.params.nuevo_nombre
        if (!nombre || !nuevo_nombre) {
            return res.status(400).json("Parametros incompletos")
        }

        const rol = await Roles.findAll({
            where: {
                nombre
            }
        })

        if (!rol) {
            return res.status(404).json({message: "Rol no encontrado"})
        }

        await rol.update({
            nombre: nuevo_nombre
        });

        res.status(200).json({message: "Modificacion hecha", rol})
    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
};

const postAsignarPermiso = async (req, res) => {
    try {
        const id_rol = Number(req.params.id_rol)
        const id_permiso = Number(req.params.id_permiso)
    
        if (!id_rol || !id_permiso) {
            return res.status(400).json({message:"Parametros incompletos"})
        }

        const rol = await Roles.findByPk(id_rol)
        if (!rol) {
            return res.status(400).json({message:"No existe ese rol"})
        }

        const permiso = await Permisos.findByPk(id_permiso);
        if (!permiso) {
            return res.status(404).json({ message: "No existe ese permiso" });
        }
        
        await rol.addPermisos(permiso)
        res.status(201).json({message: "Asignado correctamente"})

    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
    
}

const deleteBorrarPermiso = async (req, res) => {
    try {
        const id_rol = Number(req.params.id_rol)
        const id_permiso = Number(req.params.id_permiso)

        if (!id_rol || !id_permiso) {
                return res.status(400).json({message:"Parametros incompletos"})
        }

        const rol = await Roles.findByPk(id_rol)
        if (!rol) {
            return res.status(400).json({message:"No existe ese rol"})
        }

        const permiso = await Permisos.findByPk(id_permiso);
        if (!permiso) {
            return res.status(404).json({ message: "No existe ese permiso" });
        }

        const estado = await rol.hasPermiso(id_permiso)
        if (!estado) {
            return res.status(404).json({message: "Ese Rol no tiene ese permiso"})
        }

        await rol.removePermiso(permiso)

        res.status(200).json({message: "Borrado correcto"})
    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
    

}

module.exports = {
    getMostrarRoles,
    postAgregarRol,
    deletedBorrarRol,
    patchModificarRol,
    postAsignarPermiso,
    deleteBorrarPermiso
};