const { Router } = require('express');
const { getSucursales, getSucursal, crearSucursal, actualizarSucursal, eliminarSucursal } = require('../controllers/sucursalController');
const router = Router();

router.get('/VerSucursales', getSucursales);
router.get('/VerSucursal/:id_sucursal', getSucursal);
router.post('/CrearSucursal', crearSucursal);
router.put('/ActualizarSucursal/:id_sucursal', actualizarSucursal);
router.delete('/BorrarSucursal/:id_sucursal', eliminarSucursal);

module.exports = router;