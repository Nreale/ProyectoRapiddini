const { Router } = require('express');
const { getLocales, getLocal, postAgregarLocal, patchModificarLocal, deleteBorrarLocal,BuscarLocalesPorVendedor } = require('../controllers/localesController');
const { autorizacion } = require('../middleware/autorizacion');
const upload = require('../middlewares/upload');
const router = Router();

router.get('/ObtenerLocales', getLocales);
router.get('/ObtenerLocalesByVendedor',autorizacion, BuscarLocalesPorVendedor);
router.get('/BuscarLocal/:nombre', getLocal);
router.post('/AgregarLocal', autorizacion, upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]),postAgregarLocal);
router.patch('/ModificarLocal/:id_local', upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'logo', maxCount: 1 }
]),patchModificarLocal);
router.delete('/BorrarLocal/:id_local', deleteBorrarLocal);


module.exports = router;