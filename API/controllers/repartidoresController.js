const { Repartidores } = require('../models/index.js');

const getRepartidores = async (req, res) => {
    try {
        const repartidores = await Repartidores.findAll();

        return res.status(200).json(repartidores);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidores.findByPk(
            Number(req.params.id)
        );

        if (!repartidor) {
            return res.status(404).json({
                mensaje: "Repartidor no encontrado"
            });
        }

        return res.status(200).json(repartidor);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const postAgregarRepartidor = async (req, res) => {
    try {
        const {
            nombre,
            estado,
            nacionalidad,
            vehiculo,
            ID_Licencia
        } = req.body;

        if (
            !nombre ||
            estado === undefined ||
            !nacionalidad ||
            !vehiculo ||
            ID_Licencia === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan parametros"
            });
        }

        const repartidor = await Repartidores.create({
            nombre,
            estado,
            nacionalidad,
            vehiculo,
            ID_Licencia
        });

        return res.status(201).json({
            mensaje: "Repartidor agregado correctamente",
            repartidor
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const patchModificarRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidores.findByPk(
            Number(req.params.id)
        );

        if (!repartidor) {
            return res.status(404).json({
                mensaje: "Repartidor no encontrado"
            });
        }

        const {
            nombre,
            estado,
            nacionalidad,
            vehiculo,
            ID_Licencia
        } = req.body;

        await repartidor.update({
            nombre,
            estado,
            nacionalidad,
            vehiculo,
            ID_Licencia
        });

        return res.status(200).json({
            mensaje: "Repartidor modificado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const deleteBorrarRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidores.findByPk(
            Number(req.params.id)
        );

        if (!repartidor) {
            return res.status(404).json({
                mensaje: "Repartidor no encontrado"
            });
        }

        await repartidor.destroy();

        return res.status(200).json({
            mensaje: "Repartidor borrado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getRepartidores,
    getRepartidor,
    postAgregarRepartidor,
    patchModificarRepartidor,
    deleteBorrarRepartidor
};