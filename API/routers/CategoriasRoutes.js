const { Router } = require('express');
const { obtenerCategorias, obtenerCategoriaPorNombre, crearCategoria, actualizarCategoriaPorNombre, eliminarCategoriaPorNombre } = require('../controllers/categoriasController');
const router = Router();

router.get('/ObtenerCategorias', obtenerCategorias);
router.get('/BuscarCategoria/:nombre', obtenerCategoriaPorNombre);
router.post('/AgregarCategoria', crearCategoria);
router.put('/ModificarCategoria/:nombre', actualizarCategoriaPorNombre);
router.delete('/BorrarCategoria/:nombre', eliminarCategoriaPorNombre);

module.exports = router;