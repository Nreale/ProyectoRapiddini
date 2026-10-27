const { Carritos, Productos, Pedidos } = require('../models/index.js');

const getMostrarCarritos = async (req, res) => {
    try {
        const carritos = await Carritos.findAll({
            include: [
                { model: Productos },
                { model: Pedidos }
            ]
        });

        if (carritos.length === 0) {
            return res.status(404).json({ message: "No hay carritos registrados" });
        }

        return res.status(200).json({ message: "Carritos:", carritos });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getBuscarCarrito = async (req, res) => {
    try {
        const { id } = req.params; // Aca va el id del pedido, para que muestre todos los que pertenezcan al carrito

        if (!id) {
            return res.status(400).json({ message: "Falta el id del pedido" });
        }

        const carritos = await Carritos.findAll({
            where: { Id_Pedido: id },
            include: [
                { model: Productos },
                { model: Pedidos }
            ]
        });

        if (carritos.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos en este carrito" });
        }

        return res.status(200).json({ message: "Carrito encontrado", carritos });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const postCrearCarrito = async (req, res) => {
    try {
        const { Id_Producto, Id_Pedido } = req.body;
        let { cantidad } = req.body;

        if (!Id_Producto || !Id_Pedido) {
            return res.status(400).json({ message: "Faltan datos obligatorios (Id_Producto o Id_Pedido)" });
        }

        if (!cantidad) {
            cantidad = 1;
        }

        const nuevoCarrito = await Carritos.create({
            Id_Producto,
            Id_Pedido,
            cantidad
        });

        return res.status(201).json({ message: "Producto agregado al carrito correctamente", id: nuevoCarrito.id });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const patchModificarCarrito = async (req, res) => {
    try {
        const { cantidad } = req.body;
        const carrito = await Carritos.findByPk(Number(req.params.id));

        if (!carrito) {
            return res.status(404).json({ message: "Item de carrito no encontrado" });
        }

        const datosActualizar = {};

        if (cantidad !== undefined) datosActualizar.cantidad = cantidad;

        await carrito.update(datosActualizar);

        return res.status(200).json({ message: "Modificado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteBorrarCarrito = async (req, res) => {
    try {
        const { id } = req.params;
        const carrito = await Carritos.findByPk(id);

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        await carrito.destroy();

        return res.status(200).json({ message: "Carrito borrado correctamente" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMostrarCarritos,
    getBuscarCarrito,
    postCrearCarrito,
    patchModificarCarrito,
    deleteBorrarCarrito
};