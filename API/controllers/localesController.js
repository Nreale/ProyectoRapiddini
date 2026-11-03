const { Locales, Vendedores, Sucursales, Pedidos, Carritos, Productos, Usuarios } = require('../models/index.js');

const getLocales = async (req, res) => {
    try {
        const locales = await Locales.findAll();

        return res.status(200).json({
            locales
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener los locales',
            errorDetails: error.message
        });
    }
};

const BuscarLocalesPorVendedor = async (req, res) => {
    try {
        const id = req.user.id

        const vendedor = await Vendedores.findOne({
            where: {
                Id_Usuario: id
            }
        })

        if (!vendedor) {
            return res.status(404).json({message: "Vendedor no encontrado"})
        }

        const locales = await Locales.findAll({
            where: { Id_Vendedor: vendedor.id },
            include: [
                { model: Sucursales, required: false },
                { model: Productos, required: false }
            ]
        });

        if (locales.length === 0) {
            return res.status(200).json({message: "Ese usuario no tiene locales registrados"});
        }

        const localesConEstadisticas = [];

        
        for (let i = 0; i < locales.length; i++) {
            const local = locales[i];

            
            const idsProductos = local.Productos ? local.Productos.map(p => p.id) : [];

            let totalVentas = 0;
            let ingresosTotales = 0;

            if (idsProductos.length > 0) {
               
                const itemsCarrito = await Carritos.findAll({
                    where: { Id_Producto: idsProductos },
                    include: [{
                        model: Pedidos,
                        required: true,
                        where: { Estado: 'Completado' }
                    }]
                });

                
                const idsPedidosUnicos = [...new Set(itemsCarrito.map(item => item.Id_Pedido))];
                totalVentas = idsPedidosUnicos.length;

                
                for (let j = 0; j < idsPedidosUnicos.length; j++) {
                    const idPedido = idsPedidosUnicos[j];
                    const pedidoEncontrado = itemsCarrito.find(item => item.Id_Pedido === idPedido)?.Pedido;
                    
                    if (pedidoEncontrado && pedidoEncontrado.Total) {
                        ingresosTotales += Number(pedidoEncontrado.Total);
                    }
                }
            }

            
            local.ventasMes = totalVentas
            local.ingresos = ingresosTotales

            
            localesConEstadisticas.push(local);
        }

        
        return res.status(200).json({locales: localesConEstadisticas})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error al obtener los locales y sus estadísticas',
            errorDetails: error.message
        })
    }
}

const getLocal = async (req, res) => {
    try {
        const { nombre } = req.params;

        const local = await Locales.findOne({
            where: { nombre }
        });

        if (!local) {
            return res.status(404).json({
                message: "Local no encontrado"
            });
        }

        return res.status(200).json({
            data: local
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al obtener el local',
            errorDetails: error.message
        });
    }
};

const postAgregarLocal = async (req, res) => {
    try {
        const { nombre, telefono, estado, imagen } = req.body;
        const Id_Usuario = req.user.id

        if (!nombre || telefono === undefined || estado === undefined ) {
            return res.status(400).json({
                message: "Faltan parámetros obligatorios"
            });
        }

        const vendedor = await Vendedores.findOne({
            where: {
                Id_Usuario,
                isActive: true
            }
        })

        if (!vendedor) {
            return res.status(404).json({message: "Vendedor no encontrado"})
        }

        const local = await Locales.create({
            nombre,
            telefono,
            estado,
            imagen,
            Id_Vendedor: vendedor.id
        });

        return res.status(201).json({
            message: "Local agregado correctamente",
            data: local
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
            message: 'Error interno del servidor al crear el local',
            errorDetails: error.message
        });
    }
};

const patchModificarLocal = async (req, res) => {
    try {
        const { id_local } = req.params;
        const local = await Locales.findByPk(Number(id_local));

        if (!local) {
            return res.status(404).json({
                message: "Local no encontrado"
            });
        }

        const { nombre, telefono, estado, imagen } = req.body;

        await local.update({
            nombre,
            telefono,
            estado,
            imagen
        });

        return res.status(200).json({
            message: "Local modificado correctamente",
            data: local
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al modificar el local',
            errorDetails: error.message
        });
    }
};

const deleteBorrarLocal = async (req, res) => {
    try {
        const { id_local } = req.params;
        const local = await Locales.findByPk(Number(id_local));

        if (!local) {
            return res.status(404).json({
                message: "Local no encontrado"
            });
        }

        await local.destroy();

        return res.status(200).json({
            message: "Local borrado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor al borrar el local',
            errorDetails: error.message
        });
    }
};


module.exports = {
    getLocales,
    getLocal,
    postAgregarLocal,
    patchModificarLocal,
    deleteBorrarLocal,
    BuscarLocalesPorVendedor
};