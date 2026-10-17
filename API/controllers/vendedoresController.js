const { Vendedores, Usuarios } = require('../models/index.js');
const {sequelize} = require('../config/db.js');
const bcrypt = require('bcrypt');
const { DATE } = require('sequelize');


const postRegistrarVendedor = async (req, res) =>{
    const t = await sequelize.transaction();

    try {
        const { nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero, CUIT, Razon_Social } = req.body;
        if (!nombre || !apellido || !email || !telefono || !contraseña || !fecha_nacimiento || !genero || !CUIT || !Razon_Social) {
            await t.rollback();
            return res.status(400).json({message: "Parametros incompletos"})
        }

        const usuario = await Usuarios.findOne({ 
            where: { email, isActive: true } 
        });

        if (usuario) {
            await t.rollback();
            return res.status(409).json({ message: "Este email ya está registrado" });
        }

        // 2. Validar si el CUIT ya existe en la tabla de Vendedores
        const vendedor = await Vendedores.findOne({ 
            where: { CUIT } 
        });

        if (vendedor) {
            await t.rollback();
            return res.status(409).json({ message: "Este CUIT ya se encuentra registrado" });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 12);
        
        const nuevoUsuario = await Usuarios.create({
            nombre,
            apellido,
            email,
            telefono,
            contraseña: hashedPassword,
            fecha_nacimiento,
            genero,
            isActive: true
        }, { transaction: t });

        
        const nuevoVendedor = await Vendedores.create({
            CUIT,
            Razon_Social,
            Id_Usuario: nuevoUsuario.id,
            isActive: true,
            fecha_registro_comercial: Date.now()
        }, { transaction: t });

        
        await t.commit();

        return res.status(201).json({
            message: "Usuario y vendedor registrados con éxito",
            usuario: nuevoUsuario,
            vendedor: nuevoVendedor
        });

    } catch (error) {
        // Si algo falla en el proceso, revertimos todo lo hecho en la base de datos
        console.log(error)
        await t.rollback();
        return res.status(500).json({ error: error.message });
    }
}

const getVendedorByPK = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json({mensaje: "Falta el id"})
        }
        const vendedor = await Vendedores.findByPk(Number(req.params.id),{
            where: {isActive: true},
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
        if(vendedores.length === 0){
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