const { Categorias } = require('../models/CategoriasModel.js');

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categorias.findAll();
        return res.status(200).json({
            success: true,
            categorias
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener las categorías'
        });
    }
};

const obtenerCategoriaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre proporcionado no es válido'
            });
        }

        const categoria = await Categorias.findOne({
            where: { nombre }
        });

        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'La categoría con el nombre especificado no existe'
            });
        }

        return res.status(200).json({
            success: true,
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al obtener la categoría'
        });
    }
};

const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, imagen } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({
                success: false,
                message: 'El nombre y la descripción son obligatorios',
                imagen
            });
        }

        const nuevaCategoria = await Categorias.create({
            nombre,
            descripcion
        });

        return res.status(201).json({
            success: true,
            message: 'Categoría creada con éxito',
            data: nuevaCategoria
        });
    } catch (error) {
        console.error("Error al crear la categoria: ", error)
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al crear la categoría',
            errorDetails: error.message
        });
    }
};

const actualizarCategoriaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const { nuevoNombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre proporcionado no es válido',
                imagen
            });
        }

        const categoria = await Categorias.findOne({
            where: { nombre }
        });

        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'La categoría con el nombre especificado no existe'
            });
        }

        const id = categoria.id;

        categoria.nombre = nuevoNombre !== undefined ? nuevoNombre : categoria.nombre;
        categoria.descripcion = descripcion !== undefined ? descripcion : categoria.descripcion;
        categoria.imagen = imagen !== undefined ? imagen : categoria.imagen;

        await categoria.save();

        return res.status(200).json({
            success: true,
            message: `Categoría con ID ${id} actualizada con éxito`,
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al actualizar la categoría'
        });
    }
};

const eliminarCategoriaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;

        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre proporcionado no es válido'
            });
        }

        const categoria = await Categorias.findOne({
            where: { nombre }
        });

        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'La categoría con el nombre especificado no existe'
            });
        }

        const id = categoria.id;

        await categoria.destroy();

        return res.status(200).json({
            success: true,
            message: `Categoría con ID ${id} eliminada con éxito`
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al eliminar la categoría'
        });
    }
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorNombre,
    crearCategoria,
    actualizarCategoriaPorNombre,
    eliminarCategoriaPorNombre
};