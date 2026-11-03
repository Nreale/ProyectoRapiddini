const { Categorias } = require('../models/categoriasModel.js');

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categorias.findAll();
        return res.status(200).json({
            categorias
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener las categorías'
        });
    }
};

const obtenerCategoriaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;

        if (!nombre) {
            return res.status(400).json({
                message: 'El nombre proporcionado no es válido'
            });
        }

        const categoria = await Categorias.findOne({
            where: { nombre }
        });

        if (!categoria) {
            return res.status(404).json({
                message: 'La categoría con el nombre especificado no existe'
            });
        }

        return res.status(200).json({
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener la categoría'
        });
    }
};

const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion} = req.body;

        const imagenPath = req.file ? `/uploads/${req.file.filename}`: null;

        if (!nombre || !descripcion|| !imagenPath) {
            return res.status(400).json({
                message: 'El nombre y la descripción son obligatorios',
            });
        }

        const nuevaCategoria = await Categorias.create({
            nombre,
            descripcion,
            imagen: imagenPath
        });

        return res.status(201).json({
            message: 'Categoría creada con éxito',
            data: nuevaCategoria
        });
    } catch (error) {
        console.error("Error al crear la categoria: ", error)
        return res.status(500).json({
            message: 'Error interno del servidor al crear la categoría',
            errorDetails: error.message
        });
    }
};

const actualizarCategoriaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const { nuevoNombre, descripcion} = req.body;
        

        const imagenPath = req.file ? `/uploads/${req.file.filename}` : undefined;

        if (!nombre) {
            return res.status(400).json({
                message: 'El nombre proporcionado no es válido',
            });
        }

        const categoria = await Categorias.findOne({
            where: { nombre }
        });

        if (!categoria) {
            return res.status(404).json({
                message: 'La categoría con el nombre especificado no existe'
            });
        }

        const id = categoria.id;

        categoria.nombre = nuevoNombre !== undefined ? nuevoNombre : categoria.nombre;
        categoria.descripcion = descripcion !== undefined ? descripcion : categoria.descripcion;
        categoria.imagen = imagenPath !== undefined ? imagenPath : categoria.imagen;

        await categoria.save();

        return res.status(200).json({
            message: `Categoría con ID ${id} actualizada con éxito`,
            data: categoria
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al actualizar la categoría'
        });
    }
};

const eliminarCategoriaPorNombre = async (req, res) => {
    try {
        const { nombre } = req.params;

        if (!nombre) {
            return res.status(400).json({
                message: 'El nombre proporcionado no es válido'
            });
        }

        const categoria = await Categorias.findOne({
            where: { nombre }
        });

        if (!categoria) {
            return res.status(404).json({
                message: 'La categoría con el nombre especificado no existe'
            });
        }

        const id = categoria.id;

        await categoria.destroy();

        return res.status(200).json({
            message: `Categoría con ID ${id} eliminada con éxito`
        });
    } catch (error) {
        return res.status(500).json({
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