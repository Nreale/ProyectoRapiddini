const { Router } = require('express');
const { getSucursales, getSucursal, postAgregarSucursal, patchModificarSucursal, deleteBorrarSucursal } = require('../controllers/sucursalesController');
const router = Router();

router.get('/VerSucursales', getSucursales);
router.get('/VerSucursal/:id_sucursal', getSucursal);
router.post('/CrearSucursal', postAgregarSucursal);
router.put('/ActualizarSucursal/:id_sucursal', patchModificarSucursal);
router.delete('/BorrarSucursal/:id_sucursal', deleteBorrarSucursal);

module.exports = router;