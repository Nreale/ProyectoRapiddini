const { Router } = require('express');
const { getLocales, getLocal, postAgregarLocal, patchModificarLocal, deleteBorrarLocal,BuscarLocalesPorVendedor } = require('../controllers/localesController');
const { autorizacion } = require('../middleware/autorizacion');
const router = Router();

router.get('/ObtenerLocales', getLocales);
router.get('/ObtenerLocalesByVendedor',autorizacion, BuscarLocalesPorVendedor);
router.get('/BuscarLocal/:nombre', getLocal);
router.post('/AgregarLocal', postAgregarLocal);
router.patch('/ModificarLocal/:id_local', patchModificarLocal);
router.delete('/BorrarLocal/:id_local', deleteBorrarLocal);


module.exports = router;