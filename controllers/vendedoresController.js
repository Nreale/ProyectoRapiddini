const { Vendedores, Usuarios } = require('../models/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getVendedorByPK = async (req, res) => {
    try {
        if (req.params.id === undefined) {
            return res.status(400).json({mensaje: "Falta el id"})
        }
        const vendedor = await Vendedores.findByPk(Number(req.params.id),{
            where: {
                isActive: true
            },
            include: { 
                model: Usuarios, 
                attributes: ['nombre', 'apellido', 'email'] 
            }
        })
        if (!vendedor) {
            return res.status(404).json("Vendedor no encontrado")
        }

        res.status(200).json({mensaje: "Vendedor encontrado", vendedor: vendedor})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}

const getVendedores = async (req, res) => {
    try{
        const Vendedores = await Vendedores.findAll({
            include: {
                model: Usuarios,
                attributes: ['nombre', 'apellido', 'email']
            }
        })
        if(Vendedores.length === 0){
            return res.status(404).json({ mensaje: "No hay vendedores registrados" });
        }
        return res.status(200).json(vendedores);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
        
};

module.exports = { 
    getVendedorByPK,
    getVendedores
};