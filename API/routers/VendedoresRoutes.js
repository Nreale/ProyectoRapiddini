const { Router } = require('express');
const {postRegistrarVendedor, getVendedores, getVendedorByPK, patchModificarVendedor, deleteBorrarVendedor} = require('../controllers/vendedoresController');
const router = Router();

router.get('/getVendedores', getVendedores);
router.get('/BuscarVendedor/:id', getVendedorByPK);
router.post('/Registrarte', postRegistrarVendedor);
router.delete('/EliminarCuenta/:id', deleteBorrarVendedor);
router.patch('/ModificarCuenta', patchModificarVendedor);

module.exports = router;