const { Router } = require('express');
const {patchModificarProducto, deletedBorrarProducto, postAgregarProducto, getBuscarProducto, getObtenerProductos} = require('../controllers/productosController');
const router = Router();

router.get('/ObtenerProductos', getObtenerProductos);
router.get('/BuscarProducto/:id', getBuscarProducto);
router.post('/AgregarProducto', postAgregarProducto);
router.delete('/BorrarProducto', deletedBorrarProducto);
router.patch('/ModificarProducto/:id', patchModificarProducto);


module.exports = router;

