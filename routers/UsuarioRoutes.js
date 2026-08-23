const { Router } = require('express');
const {patchModificarUsuario, deletedBorrarUsuario, postRegistrarUsuario, getBuscarUsuario} = require('../controllers/usuariosController');
const router = Router();

router.get('/BuscarUsuario/:id', getBuscarUsuario);
router.post('/Registrarte', postRegistrarUsuario);
router.delete('/EliminarCuenta/:id', deletedBorrarUsuario);
router.patch('/ModificarCuenta/:id', patchModificarUsuario);

module.exports = router;