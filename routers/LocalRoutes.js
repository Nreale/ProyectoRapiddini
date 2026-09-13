const { Router } = require('express');
const { getLocales, getLocal, postAgregarLocal, patchModificarLocal, deleteBorrarLocal } = require('../controllers/localController');
const router = Router();

router.get('/ObtenerLocales', getLocales);
router.get('/BuscarLocal/:id_local', getLocal);
router.post('/AgregarLocal', postAgregarLocal);
router.patch('/ModificarLocal/:id_local', patchModificarLocal);
router.delete('/BorrarLocal/:id_local', deleteBorrarLocal);

module.exports = router;