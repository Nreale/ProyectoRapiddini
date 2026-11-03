const { Router } = require('express');
const { obtenerCategorias, obtenerCategoriaPorNombre, crearCategoria, actualizarCategoriaPorNombre, eliminarCategoriaPorNombre } = require('../controllers/categoriasController');
const upload = require('../middlewares/upload');
const router = Router();

router.get('/ObtenerCategorias', obtenerCategorias);
router.get('/BuscarCategoria/:nombre', obtenerCategoriaPorNombre);
router.post('/AgregarCategoria', upload.single('imagen'), crearCategoria);
router.put('/ModificarCategoria/:nombre', upload.single('imagen'), actualizarCategoriaPorNombre);
router.delete('/BorrarCategoria/:nombre', eliminarCategoriaPorNombre);

module.exports = router;