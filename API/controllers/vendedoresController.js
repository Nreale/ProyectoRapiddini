const { Vendedores, Usuarios } = require('../models/index.js');


const postRegistrarVendedor = async (req, res) =>{
    try {
        
        const { CUIT, Razon_Social, telefono, Id_Usuario } = req.body;

        if (!CUIT || !Razon_Social || !telefono || !Id_Usuario) {
            return res.status(400).json({ 
                mensaje: "Faltan parámetros obligatorios (CUIT, Razon_Social, telefono, Id_Usuario)" 
            })
        }

        const usuarioExiste = await Usuarios.findByPk(Number(Id_Usuario));
        if (!usuarioExiste) {
            return res.status(404).json({ mensaje: "El usuario especificado no existe" })
        }

        const vendedorExistente = await Vendedores.findOne({ where: { Id_Usuario } });
        if (vendedorExistente) {
            return res.status(409).json({ mensaje: "Este usuario ya tiene un perfil de vendedor registrado" })
        }

        const nuevoVendedor = await Vendedores.create({
            CUIT,
            Razon_Social,
            telefono,
            Id_Usuario
        })

        return res.status(201).json({
            mensaje: "Perfil de vendedor registrado con éxito",
            vendedor: nuevoVendedor
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getVendedorByPK = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json({mensaje: "Falta el id"})
        }
        const vendedor = await Vendedores.findByPk(Number(req.params.id),{
            include: { 
                model: Usuarios, 
                attributes: ['nombre', 'apellido', 'email'] 
            }
        })
        if (!vendedor || !vendedor.isActive) {
            return res.status(404).json({message: "Vendedor no encontrado o inactivo"})
        }

        res.status(200).json({mensaje: "Vendedor encontrado", vendedor: vendedor})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const getVendedores = async (req, res) => {
    try{
        const vendedores = await Vendedores.findAll({
            where: {isActive: true},
            include: {
                model: Usuarios,
                attributes: ['nombre', 'apellido', 'email']
            }
        })
        if(Vendedores.length === 0){
            return res.status(404).json({ mensaje: "No hay vendedores registrados" })
        }
        return res.status(200).json(vendedores)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
        
};

const patchModificarVendedor = async (req, res) => {
    try {
        
        const{CUIT, Razon_Social} = req.body

        const vendedor = await Vendedores.findByPk(Number(req.params.id))

        if (!vendedor || !vendedor.isActive){
            return res.status(404).json({mensaje: "Vendedor no encontrado o inactivo"})
        }

        const datosActualizar = {}

        if (CUIT !== undefined) datosActualizar.CUIT = CUIT;
        if (Razon_Social !== undefined) datosActualizar.Razon_Social = Razon_Social;

        await vendedor.update(datosActualizar);

        return res.status(200).json({mensaje: "Vendedor modificado correctamente"})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const deleteBorrarVendedor = async (req, res) => {
    try {

        const vendedor = await Vendedores.findByPk(Number(req.params.id))

        if(!vendedor){
            return res.status(404).json({message: "Vendedor no encontrado"})
        }

        if(vendedor.isActive == false){
            return res.status(400).json({ mensaje: "El vendedor ya se encuentra dado de baja" })
        }
        await vendedor.update({ isActive: false })

        return res.status(200).json({ mensaje: "Perfil de vendedor dado de baja correctamente" })

    } catch (error) {
        return res.status(500).json({error: error.message })
        
    }
}

module.exports = { 
    postRegistrarVendedor,
    getVendedorByPK,
    getVendedores,
    patchModificarVendedor,
    deleteBorrarVendedor
};