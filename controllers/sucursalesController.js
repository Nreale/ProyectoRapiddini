const { Sucursales } = require('../models/index.js');

// Obtener todas las sucursales
const getSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursales.findAll();
        res.status(200).json(sucursales);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las sucursales', error: error.message });
    }
};

// Obtener una sucursal por ID
const getSucursalById = async (req, res) => {
    try {
        const { id } = req.params;
        const sucursal = await Sucursales.findByPk(id);
        if (!sucursal) {
            return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
        }
        res.status(200).json(sucursal);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la sucursal', error: error.message });
    }
};

// Crear una sucursal
const crearSucursal = async (req, res) => {
    try {
        const { nombre, direccion } = req.body;
        const nuevaSucursal = await Sucursales.create({ nombre, direccion });
        res.status(201).json(nuevaSucursal);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la sucursal', error: error.message });
    }
};

// Actualizar una sucursal
const actualizarSucursal = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion } = req.body;
        const sucursal = await Sucursales.findByPk(id);
        
        if (!sucursal) {
            return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
        }

        await sucursal.update({ nombre, direccion });
        res.status(200).json({ mensaje: 'Sucursal actualizada correctamente', sucursal });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la sucursal', error: error.message });
    }
};

// Eliminar una sucursal
const eliminarSucursal = async (req, res) => {
    try {
        const { id } = req.params;
        const sucursal = await Sucursales.findByPk(id);
        
        if (!sucursal) {
            return res.status(404).json({ mensaje: 'Sucursal no encontrada' });
        }

        await sucursal.destroy();
        res.status(200).json({ mensaje: 'Sucursal eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la sucursal', error: error.message });
    }
};

module.exports = {
    getSucursales,
    getSucursalById,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
};