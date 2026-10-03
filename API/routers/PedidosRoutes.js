const { Router } = require('express');
const {
    getPedidos,
    getPedidoById,
    crearPedido,
    cambiarEstadoPedido,
    asignarRepartidor,
    eliminarPedido
} = require('../controllers/pedidosController.js');

const router = Router();

router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.post('/', crearPedido);
router.put('/:id/estado', cambiarEstadoPedido);
router.put('/:id/repartidor', asignarRepartidor);
router.delete('/:id', eliminarPedido);

module.exports = router;