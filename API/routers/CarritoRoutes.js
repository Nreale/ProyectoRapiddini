const { Router } = require('express');
const {getMostrarCarritos, getBuscarCarrito, postCrearCarrito, deleteBorrarCarrito, patchModificarCarrito} = require('../controllers/carritosController');
const router = Router();

router.get('/MostrarCarritos', getMostrarCarritos);
router.get('/BuscarCarrito/:id', getBuscarCarrito);
router.post('/CrearCarrito', postCrearCarrito);
router.patch('/ModificarCarrito/:id', patchModificarCarrito);
router.delete('/BorrarCategoria/:id', deleteBorrarCarrito);

module.exports = router;