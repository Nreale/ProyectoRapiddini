const { Router } = require('express');
const {patchModificarUsuario, deletedBorrarUsuario, postRegistrarUsuario, getBuscarUsuario, getIniciarSesion, postAsignarRol, getMostrarUsuarios, deletedBorrarRol} = require('../controllers/usuariosController');
const router = Router();

router.get('/MostrarUsuarios', getMostrarUsuarios);
router.get('/BuscarUsuario/:id', getBuscarUsuario);
router.get('/IniciarSesion', getIniciarSesion);
router.post('/Registrarte', postRegistrarUsuario);
router.post('/AsignarRol/:id_usuario/:id_rol', postAsignarRol);
router.delete('/EliminarCuenta/:id', deletedBorrarUsuario);
router.delete('/EliminarRol/:id_usuario/:id_rol', deletedBorrarRol);
router.patch('/ModificarCuenta/:id', patchModificarUsuario);

module.exports = router;