const { Locales } = require('../models/index.js');

const getLocales = async (req, res) => {
    try {
        const locales = await Locales.findAll();

        return res.status(200).json({
            locales
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener los locales',
            errorDetails: error.message
        });
    }
};

const getLocal = async (req, res) => {
    try {
        const { nombre } = req.params;

        const local = await Locales.findOne({
            where: { nombre }
        });

        if (!local) {
            return res.status(404).json({
                message: "Local no encontrado"
            });
        }

        return res.status(200).json({
            data: local
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener el local',
            errorDetails: error.message
        });
    }
};

const postAgregarLocal = async (req, res) => {
    try {
        const { nombre, telefono, estado, imagen } = req.body;

        if (!nombre || telefono === undefined || estado === undefined) {
            return res.status(400).json({
                message: "Faltan parámetros obligatorios"
            });
        }

        const local = await Locales.create({
            nombre,
            telefono,
            estado,
            imagen
        });

        return res.status(201).json({
            message: "Local agregado correctamente",
            data: local
        });

    } catch (error) {
        return res.status(500).json({ 
            message: 'Error interno del servidor al crear el local',
            errorDetails: error.message
        });
    }
};

const patchModificarLocal = async (req, res) => {
    try {
        const { id_local } = req.params;
        const local = await Locales.findByPk(Number(id_local));

        if (!local) {
            return res.status(404).json({
                message: "Local no encontrado"
            });
        }

        const { nombre, telefono, estado, imagen } = req.body;

        await local.update({
            nombre,
            telefono,
            estado,
            imagen
        });

        return res.status(200).json({
            message: "Local modificado correctamente",
            data: local
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al modificar el local',
            errorDetails: error.message
        });
    }
};

const deleteBorrarLocal = async (req, res) => {
    try {
        const { id_local } = req.params;
        const local = await Locales.findByPk(Number(id_local));

        if (!local) {
            return res.status(404).json({
                message: "Local no encontrado"
            });
        }

        await local.destroy();

        return res.status(200).json({
            message: "Local borrado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al borrar el local',
            errorDetails: error.message
        });
    }
};

module.exports = {
    getLocales,
    getLocal,
    postAgregarLocal,
    patchModificarLocal,
    deleteBorrarLocal
};