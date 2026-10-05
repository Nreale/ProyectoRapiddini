const { Router } = require('express');
const { getSucursales,getSucursalById, crearSucursal, actualizarSucursal, eliminarSucursal } = require('../controllers/sucursalesController');
const router = Router();

router.get('/VerSucursales', getSucursales);
router.get('/VerSucursal/:id_sucursal', getSucursalById);
router.post('/CrearSucursal', crearSucursal);
router.put('/ActualizarSucursal/:id_sucursal', actualizarSucursal);
router.delete('/BorrarSucursal/:id_sucursal', eliminarSucursal);

module.exports = router;