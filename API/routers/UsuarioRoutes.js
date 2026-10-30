const { Router } = require('express');
const {patchModificarUsuario, deletedBorrarUsuario, postRegistrarUsuario, getBuscarUsuario, getIniciarSesion, getMostrarUsuarios, SolicitarCodigo, patchValidarCodigo, CambiarContraseña} = require('../controllers/usuariosController');
const {autorizacion} = require('../middleware/autorizacion')
const router = Router();

router.get('/MostrarUsuarios', getMostrarUsuarios);
router.get('/BuscarUsuario', autorizacion, getBuscarUsuario);
router.post('/IniciarSesion', getIniciarSesion);
router.post('/Registrarte', postRegistrarUsuario);
router.delete('/EliminarCuenta',autorizacion, deletedBorrarUsuario);
router.patch('/ModificarCuenta', autorizacion, patchModificarUsuario);
router.post('/SolicitarCodigo', SolicitarCodigo);
router.patch('/ValidarCodigo', patchValidarCodigo)
router.patch('/Cambiar', CambiarContraseña)

module.exports = router;
