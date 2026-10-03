const { Pedidos, Detalle_Pedido, Productos, Usuarios, Repartidores, Locales } = require('../models/index.js');

// 1. Obtener todos los pedidos (para admin/auditoría)
const getPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll({
            include: [
                { model: Detalle_Pedido },
                { model: Usuarios, attributes: ['id', 'nombre', 'email'] }
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
                { model: Detalle_Pedido, include: [Productos] },
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

// 3. Crear un nuevo pedido con sus detalles
const crearPedido = async (req, res) => {
    try {
        const { fecha, metado_pago, productos, usuarioId, localId } = req.body;

        // Validar campos obligatorios
        if (!metado_pago || !productos || productos.length === 0) {
            return res.status(400).json({ mensaje: 'Faltan campos requeridos o el carrito está vacío' });
        }

        // Calcular total a partir de los productos enviados
        let totalCalculado = 0;
        for (const item of productos) {
            const productoBD = await Productos.findByPk(item.productoId);
            if (!productoBD) {
                return res.status(404).json({ mensaje: `Producto con ID ${item.productoId} no encontrado` });
            }
            if (productoBD.stock < item.cantidad) {
                return res.status(400).json({ mensaje: `Stock insuficiente para ${productoBD.nombre}` });
            }
            totalCalculado += productoBD.precio * item.cantidad;
        }

        // Crear registro en la tabla Pedidos
        const nuevoPedido = await Pedidos.create({
            fecha: fecha || new Date(),
            estado: 'Pendiente',
            total: totalCalculado,
            metado_pago,
            UsuarioId: usuarioId || req.usuario?.id,
            LocalId: localId
        });

        // Crear los registros en Detalle_Pedido y descontar stock
        for (const item of productos) {
            await Detalle_Pedido.create({
                cantidad: item.cantidad,
                PedidoId: nuevoPedido.id,
                ProductoId: item.productoId
            });

            // Descontar del stock
            const productoBD = await Productos.findByPk(item.productoId);
            await productoBD.update({ stock: productoBD.stock - item.cantidad });
        }

        res.status(201).json({
            mensaje: 'Pedido creado exitosamente',
            pedido: nuevoPedido
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el pedido', error: error.message });
    }
};

// 4. Actualizar el estado del pedido (ej. 'En preparación', 'Despachado', 'Entregado', 'Cancelado')
const cambiarEstadoPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const pedido = await Pedidos.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.update({ estado });
        res.status(200).json({ mensaje: 'Estado del pedido actualizado', pedido });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el estado', error: error.message });
    }
};

// 5. Asignar o aceptar repartidor en un pedido
const asignarRepartidor = async (req, res) => {
    try {
        const { id } = req.params; // ID del pedido
        const { repartidorId } = req.body;

        const pedido = await Pedidos.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        await pedido.update({
            RepartidorId: repartidorId,
            estado: 'En camino'
        });

        res.status(200).json({ mensaje: 'Repartidor asignado correctamente al pedido', pedido });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al asignar repartidor', error: error.message });
    }
};

// 6. Eliminar / Cancelar pedido
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