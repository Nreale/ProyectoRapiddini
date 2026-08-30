const { Router } = require('express');
const {getMostrarRoles, postAgregarRol, deletedBorrarRol, patchModificarRol, postAsignarPermiso, deleteBorrarPermiso} = require('../controllers/rolesController')
const router = Router();

router.get('/MostrarRoles', getMostrarRoles)
router.post('/AgregarRol/:nombre', postAgregarRol)
router.post('/AsignarPermiso/:id_rol/:id_permiso', postAsignarPermiso)
router.patch('/ModificarRol/:nombre/:nuevo_nombre', patchModificarRol)
router.delete('/BorrarRol/:nombre', deletedBorrarRol)
router.delete('/BorrarPermiso/:id_rol/:id_permiso', deleteBorrarPermiso)

module.exports = router;