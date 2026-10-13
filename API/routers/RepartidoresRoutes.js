const { Router } = require('express');
const {getRepartidores, getRepartidor, postAgregarRepartidor, patchModificarRepartidor, deleteBorrarRepartidor} = require('../controllers/repartidoresController')
const router = Router();

router.get('/MostrarRepartidores', getRepartidores)
router.post('/MostrarRepartidorByID', getRepartidor)
router.post('/RegistrarRepartidor', postAgregarRepartidor)
router.delete('/ModificarRepartidor', patchModificarRepartidor)
router.delete('/BorrarRepartidor', deleteBorrarRepartidor)

module.exports = router;