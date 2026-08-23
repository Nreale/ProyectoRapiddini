const { Productos, Locales, Categorias } = require('../models/index.js');

const getBuscarProducto = async (req, res) => {
    try {
        if (req.params.producto === undefined) {
            return res.status(400).json("Poner nombre del producto")
        }
        const producto = await Productos.findAll({
        where: {
            nombre: req.params.producto
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
        const {nombre, descripcion, precio, id_categoria, id_local} = req.body

        if (!nombre || !descripcion || !precio || !id_categoria || !id_local) {
            return res.status(400).json("Faltan parametros")
        }
        const producto = await Productos.findOne({
            where: {
                nombre: nombre,
                id_local: id_local
            }
        })

        if (producto) {
            return res.status(409).json("Este Producto ya existe")
        }

        const producto_nuevo = await Productos.create({
            nombre,
            descripcion,
            precio,
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
        //REVISAR LOGICA SI SE PUEDE BORRAR POR EL NOMBRE, YA QUE PUEDEN HABER VARIAS LUGAR CON EL MISMO PRODUCTO, PERO COMO SE DEBE VERFICAR ANTES QUE 
        //EL PROPIO LOCAL LO QUIERA BORRAR DEBERIA FUNCIONAR YA QUE UN LOCAL NO TIENE DOS PRODUCTOS IGUALES
        //OSEA QUE EL NOMBRE SERIA UNICO DENTRO DE LOS PRODUCTO DEL LOCAL

        //HACER QUE BORRE PRESIONANDO UN BOTON EN EL FRONTEND

        if (req.params.nombre === undefined) {
            return res.status(400).json("Poner nombre del producto")
        }
        const producto = await Productos.destroy({
            where: {
                nombre: req.params.nombre,
                id_Local: Number(req.params.id_local) //ARREGLAR CON INCLUIDE, hacer validacion de permisos
            }
        })

        if (!producto) {
            return res.status(404).json("Producto no encontrado, pruebe mas tarde")
        }

        res.status(200).json(`Ha sido borrado correctamente`)
        
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const patchModificarProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_categoria } = req.body;

        const producto = await Productos.findByPk(Number(req.params.id));
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado", estado: false });
        }

        //FALTA HACER EL INCLUIDE
        await producto.update({
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
    patchModificarProducto,
    deletedBorrarProducto,
    postAgregarProducto,
    getBuscarProducto
};