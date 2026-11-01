const { Router } = require('express');
const {
    getPedidos,
    getPedidoById,
    crearPedido,
    cambiarEstadoPedido,
    asignarRepartidor,
    eliminarPedido,
    getCarritoActivo
} = require('../controllers/pedidosController.js');
const {autorizacion} = require('../middleware/autorizacion')

const router = Router();

router.get('/', getPedidos);
router.get('/Carrito', autorizacion, getCarritoActivo);
router.get('/:id', getPedidoById);
router.post('/', crearPedido);
router.put('/:id/estado', cambiarEstadoPedido);
router.put('/:id/repartidor', asignarRepartidor);
router.delete('/:id', eliminarPedido);

module.exports = router;