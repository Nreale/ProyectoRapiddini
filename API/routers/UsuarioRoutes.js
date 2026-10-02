const { Router } = require('express');
const {patchModificarUsuario, deletedBorrarUsuario, postRegistrarUsuario, getBuscarUsuario, getIniciarSesion, postAsignarRol, getMostrarUsuarios, deletedBorrarRol} = require('../controllers/usuariosController');
const router = Router();

router.get('/MostrarUsuarios', getMostrarUsuarios);
router.get('/BuscarUsuario/:id', getBuscarUsuario);
router.post('/IniciarSesion', getIniciarSesion);
router.post('/Registrarte', postRegistrarUsuario);
router.delete('/EliminarCuenta/:id', deletedBorrarUsuario);
router.patch('/ModificarCuenta/:id', patchModificarUsuario);

module.exports = router;