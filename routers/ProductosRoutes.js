const { Router } = require('express');
const {patchModificarProducto, deletedBorrarProducto, postAgregarProducto, getBuscarProducto} = require('../controllers/productosController');
const router = Router();

router.get('/BuscarProducto/:producto', getBuscarProducto);
router.post('/AgregarProducto', postAgregarProducto);
router.delete('/BorrarProducto/:nombre/:id_local', deletedBorrarProducto);
router.patch('/ModificarProducto/:id', patchModificarProducto);

module.exports = router;