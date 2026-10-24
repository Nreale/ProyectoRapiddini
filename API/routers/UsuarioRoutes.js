const { Router } = require('express');
const {patchModificarUsuario, deletedBorrarUsuario, postRegistrarUsuario, getBuscarUsuario, getIniciarSesion, postAsignarRol, getMostrarUsuarios, deletedBorrarRol} = require('../controllers/usuariosController');
const {autorizacion} = require('../middleware/autorizacion')
const router = Router();

router.get('/MostrarUsuarios', getMostrarUsuarios);
router.get('/BuscarUsuario', autorizacion, getBuscarUsuario);
router.post('/IniciarSesion', getIniciarSesion);
router.post('/Registrarte', postRegistrarUsuario);
router.delete('/EliminarCuenta',autorizacion, deletedBorrarUsuario);
router.patch('/ModificarCuenta',autorizacion, patchModificarUsuario);

module.exports = router;
