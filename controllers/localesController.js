const { Locales } = require('../models/index.js');

const getLocales = async (req, res) => {
    try {
        const locales = await Locales.findAll();

        return res.status(200).json(locales);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getLocal = async (req, res) => {
    try {
        const local = await Locales.findByPk(Number(req.params.id));

        if (!local) {
            return res.status(404).json({
                mensaje: "Local no encontrado"
            });
        }

        return res.status(200).json(local);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const postAgregarLocal = async (req, res) => {
    try {
        const {
            nombre,
            telefono,
            estado
        } = req.body;

        if (
            !nombre ||
            telefono === undefined ||
            estado === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan parametros"
            });
        }

        const local = await Locales.create({
            nombre,
            telefono,
            estado
        });

        return res.status(201).json({
            mensaje: "Local agregado correctamente",
            local
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const patchModificarLocal = async (req, res) => {
    try {
        const local = await Locales.findByPk(Number(req.params.id));

        if (!local) {
            return res.status(404).json({
                mensaje: "Local no encontrado"
            });
        }

        const {
            nombre,
            telefono,
            estado
        } = req.body;

        await local.update({
            nombre,
            telefono,
            estado
        });

        return res.status(200).json({
            mensaje: "Local modificado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const deleteBorrarLocal = async (req, res) => {
    try {
        const local = await Locales.findByPk(Number(req.params.id));

        if (!local) {
            return res.status(404).json({
                mensaje: "Local no encontrado"
            });
        }

        await local.destroy();

        return res.status(200).json({
            mensaje: "Local borrado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
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