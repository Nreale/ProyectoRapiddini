const { Router } = require('express');
const {
    getSucursales,
    getSucursalById,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
} = require('../controllers/sucursalesController.js');

const router = Router();

// Rutas base para /api/sucursales
router.get('/', getSucursales);
router.get('/:id', getSucursalById);
router.post('/', crearSucursal);
router.put('/:id', actualizarSucursal);
router.delete('/:id', eliminarSucursal);

module.exports = router;