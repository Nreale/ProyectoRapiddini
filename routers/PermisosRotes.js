const { Router } = require('express');
const {getMostrarPermisos, postAgregarPermiso, deletedBorrarPermiso} = require('../controllers/permisosController');
const router = Router();

router.get('/MostrarPermisos', getMostrarPermisos)
router.post('/AgregarPermiso/:Entidad/:Action', postAgregarPermiso)
router.delete('/BorrarPermiso/:id', deletedBorrarPermiso)


module.exports = router;