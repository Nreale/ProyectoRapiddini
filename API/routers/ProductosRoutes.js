const { Router } = require('express');
const {patchModificarProducto, deletedBorrarProducto, postAgregarProducto, getBuscarProducto, getObtenerProductos} = require('../controllers/productosController');
const { autorizacion } = require('../middleware/autorizacion');
const router = Router();

router.get('/ObtenerProductos', getObtenerProductos);
router.get('/BuscarProducto/:id', getBuscarProducto);
router.post('/AgregarProducto',autorizacion, postAgregarProducto);
router.delete('/BorrarProducto/:Id_Producto',autorizacion, deletedBorrarProducto);
router.patch('/ModificarProducto/:id',autorizacion, patchModificarProducto);


module.exports = router;

