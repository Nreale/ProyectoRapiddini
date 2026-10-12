const { Router } = require('express');
const {getMostrarRoles, CrearRol, BorrarRol, AsignarRol, SacarRol} = require('../controllers/rolesController')
const router = Router();

router.get('/MostrarRoles', getMostrarRoles)
router.post('/AgregarRol', CrearRol)
router.post('/AsignarRol', AsignarRol)
router.delete('/SacarRol', SacarRol)
router.delete('/BorrarRol', BorrarRol)

module.exports = router;