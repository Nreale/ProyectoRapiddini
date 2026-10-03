const { Router } = require('express');
const {getMostrarPermisos, CrearPermiso, BorrarPermiso, AsignarPermiso} = require('../controllers/permisosController');
const router = Router();

router.get('/MostrarPermisos', getMostrarPermisos)
router.post('/AgregarPermiso', CrearPermiso)
router.delete('/BorrarPermiso', BorrarPermiso)
router.post('/AsignarPermiso', AsignarPermiso)


module.exports = router;