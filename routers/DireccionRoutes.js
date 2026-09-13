const { Router } = require('express');
const {getDirecciones, getDireccion, crearDireccion, actualizarDireccion, eliminarDireccion} = require ('../controllers/direccionesController');
const router = Router();

router.get('/', getDirecciones);
router.get('/:id', getDireccion);
router.post('/', crearDireccion);
router.put('/:id', actualizarDireccion);
router.delete('/:id', eliminarDireccion);

module.exports = router;