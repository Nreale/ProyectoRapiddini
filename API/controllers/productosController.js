const { Productos, Locales, Categorias} = require('../models/index.js');

const getObtenerProductos = async(req, res) => {
    try {
        // Buscamos todos los registros en la tabla de productos
        const productos = await Productos.findAll({
            include: [
                {
                    model: Locales,
                    attributes: ['nombre'] // O el campo exacto del nombre del local en tu tabla
                },
                {
                    model: Categorias,
                    attributes: ['nombre'] // O el campo exacto del nombre de la categoría
                }
            ]
        }); // O Producto.find() si usan Mongoose/MongoDB

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
        const {nombre, descripcion, precio, Id_Categoria, Id_Local, imagen, stock} = req.body

        if (!nombre || !descripcion || !precio || !Id_Categoria || !Id_Local || !imagen || !stock) {
            return res.status(400).json("Faltan parametros")
        }
        const producto = await Productos.findOne({
            where: {
                nombre: nombre,
                Id_Local
            }
        })

        if (producto) {
            return res.status(409).json("Este Producto ya existe")
        }



        if (stock < 0) {
            return res.status(400).json({message: "El stock no puede ser negativo"})
        }

        if (precio < 0) {
            return res.status(400).json({message: "El precio no puede ser negativo"})
        }
        const producto_nuevo = await Productos.create({
            nombre,
            stock,
            descripcion,
            precio,
            imagen,
            Id_Categoria,
            Id_Local
        })
        
        return res.status(201).json({mensaje: "Agregado al catalogo", producto: producto_nuevo})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
    
}

const deletedBorrarProducto = async (req, res) => {
    try {
        
        const Id_Producto = req.params.Id_Producto
        const producto = await Productos.findOne({
            where: {
                id: Id_Producto,
                isActive: true
            }
        })

        if (!producto) {
            return res.status(404).json("Producto no encontrado, pruebe mas tarde")
        }

        producto.isActive = false
        await producto.save()
        res.status(200).json(`Ha sido borrado correctamente`)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, Id_Categoria, imagen, stock } = req.body;

        const producto = await Productos.findByPk(Number(req.params.id));
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado", estado: false });
        }

        if (stock < 0) {
            return res.status(400).json({message: "El stock no puede ser negativo"})
        }

        if (precio < 0) {
            return res.status(400).json({message: "El precio no puede ser negativo"})
        }

        const datosActualizar = {};

        if (nombre !== undefined && nombre !== null && nombre !== "") datosActualizar.nombre = nombre;
        if (descripcion !== undefined && descripcion !== null && descripcion !== "") datosActualizar.descripcion = descripcion;
        if (precio !== undefined && precio !== null && precio !== "") datosActualizar.precio = precio;
        if (Id_Categoria !== undefined && Id_Categoria !== null && Id_Categoria !== "") datosActualizar.Id_Categoria = Id_Categoria;
        if (imagen !== undefined && imagen !== null && imagen !== "") datosActualizar.imagen = imagen;
        if (stock !== undefined && stock !== null && stock !== "") datosActualizar.stock = stock;
        
        await producto.update(datosActualizar);
        await producto.save()
        return res.status(200).json({mensaje: "Modificado correctamente", estado: true});

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message, estado: false });
    }
}

module.exports = { 
    getObtenerProductos,
    patchModificarProducto,
    deletedBorrarProducto,
    postAgregarProducto,
    getBuscarProducto
};