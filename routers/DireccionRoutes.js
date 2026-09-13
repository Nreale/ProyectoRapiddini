const { Router } = require('express');
const {getDirecciones, getDireccion, crearDireccion, actualizarDireccion, eliminarDireccion} = require ('../controllers/direccionesController');
const router = Router();

router.get('/VerDirecciones', getDirecciones);
router.get('/BuscarDireccion/:id_direccion', getDireccion);
router.post('/AgregarDireccion', crearDireccion);
router.put('/ActualiarDireccion/:id_direccion', actualizarDireccion);
router.delete('/EliminarDireccion/:id_direccion', eliminarDireccion);

module.exports = router;