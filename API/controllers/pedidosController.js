const { Pedidos, Carritos, Productos, Usuarios, Repartidores } = require('../models/index.js');

// 1. Obtener todos los pedidos
const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll({
            include: [
                { model: Carritos, include: [Productos] },
                { model: Usuarios, attributes: ['id', 'nombre', 'email'] },
                { model: Repartidores, attributes: ['id', 'nombre'] }
            ]
        });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los pedidos', error: error.message });
    }
};

// 2. Obtener un pedido por ID
const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedidos.findByPk(id, {
            include: [
                { model: Carritos, include: [Productos] },
                { model: Usuarios, attributes: ['id', 'nombre', 'email'] },
                { model: Repartidores, attributes: ['id', 'nombre'] }
            ]
        });

        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el pedido', error: error.message });
    }
};

// 3. Crear un nuevo pedido manual
const crearPedido = async (req, res) => {
    try {
        const { id_usuario, metodo_pago, id_direccion } = req.body;

        const nuevoPedido = await Pedidos.create({
            fecha: new Date(),
            estado: 'Pendiente',
            total: 0,
            metodo_pago: metodo_pago || 'Efectivo',
            Id_Usuario: id_usuario || req.user.id,
            Id_Direccion: id_direccion || null,
            Id_Repartidor: null
        });

        res.status(201).json({
            mensaje: 'Pedido creado exitosamente',
            pedido: nuevoPedido
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar estado, pago, total o dirección del pedido
const cambiarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, metodo_pago, total, id_direccion, id_repartidor } = req.body;

        const pedido = await Pedidos.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        const datosActualizar = {};
        if (estado !== undefined) datosActualizar.estado = estado;
        if (metodo_pago !== undefined) datosActualizar.metodo_pago = metodo_pago;
        if (total !== undefined) datosActualizar.total = total;
        if (id_direccion !== undefined) datosActualizar.Id_Direccion = id_direccion;
        if (id_repartidor !== undefined) datosActualizar.Id_Repartidor = id_repartidor;

        await pedido.update(datosActualizar);

        res.status(200).json({ mensaje: 'Pedido actualizado correctamente', pedido });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el pedido', error: error.message });
    }
};

// 5. Asignar repartidor
const asignarRepartidor = async (req, res) => {
    try {
        const { id } = req.params;
        const { repartidorId } = req.body;

        const pedido = await Pedidos.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.update({
            Id_Repartidor: repartidorId,
            estado: 'En camino'
        });

        res.status(200).json({ mensaje: 'Repartidor asignado correctamente al pedido', pedido });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asignar repartidor', error: error.message });
    }
};

// 6. Eliminar pedido
const eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedidos.findByPk(id);

        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.destroy();
        res.status(200).json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el pedido', error: error.message });
    }
};

module.exports = {
    getPedidos,
    getPedidoById,
    crearPedido,
    cambiarEstadoPedido,
    asignarRepartidor,
    eliminarPedido
};