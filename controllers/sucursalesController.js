const { Sucursales } = require('../models/index.js');

const getSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursales.findAll();

        return res.status(200).json(sucursales);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursales.findByPk(Number(req.params.id));

        if (!sucursal) {
            return res.status(404).json({
                mensaje: "Sucursal no encontrada"
            });
        }

        return res.status(200).json(sucursal);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const postAgregarSucursal = async (req, res) => {
    try {
        const {
            nombre,
            direccion,
            estado
        } = req.body;

        if (
            !nombre ||
            !direccion ||
            estado === undefined
        ) {
            return res.status(400).json({
                mensaje: "Faltan parametros"
            });
        }

        const sucursal = await Sucursales.create({
            nombre,
            direccion,
            estado
        });

        return res.status(201).json({
            mensaje: "Sucursal agregada correctamente",
            sucursal
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const patchModificarSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursales.findByPk(Number(req.params.id));

        if (!sucursal) {
            return res.status(404).json({
                mensaje: "Sucursal no encontrada"
            });
        }

        const {
            nombre,
            direccion,
            estado
        } = req.body;

        await sucursal.update({
            nombre,
            direccion,
            estado
        });

        return res.status(200).json({
            mensaje: "Sucursal modificada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const deleteBorrarSucursal = async (req, res) => {
    try {
        const sucursal = await Sucursales.findByPk(Number(req.params.id));

        if (!sucursal) {
            return res.status(404).json({
                mensaje: "Sucursal no encontrada"
            });
        }

        await sucursal.destroy();

        return res.status(200).json({
            mensaje: "Sucursal borrada correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getSucursales,
    getSucursal,
    postAgregarSucursal,
    patchModificarSucursal,
    deleteBorrarSucursal
};