const jwt = require('jsonwebtoken');
const { Usuarios, Roles } = require('../models/index');
const clave = "gbyawdywiadbwa1"

const autorizacion = (req, res, next) => {
    try {
        const token = req.headers['authorization']
        
        if (!token) {
            return res.status(401).json({message: "ERROR 2"})
        }

        jwt.verify(token, clave, async (err, decoded) => {
            if (err) {
                return res.status(401).json({message: "ERROR"})
            }
            
            const user = await Usuarios.findByPk(decoded.id, {
                include: [
                    {
                        model: Roles,
                        attributes: ['nombre'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })
            
            
            if (!user) {
                return res.status(404).json({message: "Usuario no encontrado o autorizado"})
            }

            req.user = {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user
            }
            next()
        });
        
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports = {
    autorizacion
}