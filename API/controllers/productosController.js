const { Productos, Locales} = require('../models/index.js');

const getObtenerProductos = async(req, res) => {
    try {
        // Buscamos todos los registros en la tabla de productos
        const productos = await Productos.findAll(); // O Producto.find() si usan Mongoose/MongoDB

        // Respondemos con éxito y el array de productos
        return res.status(200).json({productos});
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return res.status(500).json({message: "Hubo un error al intentar obtener los productos."});
    }
}

const getBuscarProducto = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json("Faltan parametros")
        }
        const producto = await Productos.findAll({
        where: {
            id
        },
        include: {
            model: Locales,
            attributes: ['nombre']
        }
        })
        
        if (producto.length === 0) {
            return res.status(404).json("Producto no encontrado")
        }

        res.status(200).json(producto)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const postAgregarProducto = async (req, res) => {
    try {
        const {nombre, descripcion, precio, id_categoria, id_local, imagen, sotck} = req.body

        if (!nombre || !descripcion || !precio || !id_categoria || !id_local || !imagen || !sotck) {
            return res.status(400).json("Faltan parametros")
        }
        const producto = await Productos.findOne({
            where: {
                nombre: nombre,
                Id_Local: id_local
            }
        })

        if (producto) {
            return res.status(409).json("Este Producto ya existe")
        }

        if (sotck < 0) {
            return res.status(400).json({message: "El stock no puede ser negativo"})
        }
        const producto_nuevo = await Productos.create({
            nombre,
            stock,
            descripcion,
            precio,
            imagen,
            Id_Categoria: id_categoria,
            Id_Local: id_local
        })
        
        return res.status(201).json({mensaje: "Agregado al catalogo", producto: producto_nuevo})
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
}

const deletedBorrarProducto = async (req, res) => {
    try {
        

        const {nombre, Id_Local} = req.body

        if (!nombre || !Id_Local) {
            return res.status(400).json("Faltan parametros")
        }
        const producto = await Productos.findOne({
            where: {
                nombre,
                Id_Local
            }
        })

        if (!producto) {
            return res.status(404).json("Producto no encontrado, pruebe mas tarde")
        }

        producto.isActive = false
        await producto.save()
        res.status(200).json(`Ha sido borrado correctamente`)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_categoria, imagen, sotck } = req.body;

        const producto = await Productos.findByPk(Number(req.params.id));
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado", estado: false });
        }

        if (sotck < 0) {
            return res.status(400).json({message: "El stock no puede ser negativo"})
        }
        await producto.update({
            imagen,
            stock,
            nombre,
            descripcion,
            precio,
            Id_Categoria: id_categoria
        });

        return res.status(200).json({mensaje: "Modificado correctamente", estado: true});

    } catch (error) {
        return res.status(500).json({ error: error.message, estado: false });
    }
};

module.exports = { 
    getObtenerProductos,
    patchModificarProducto,
    deletedBorrarProducto,
    postAgregarProducto,
    getBuscarProducto
};