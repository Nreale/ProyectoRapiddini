const { Repartidores, Usuarios, LicenciasConducir } = require('../models/index.js');
const {sequelize} = require('../config/db.js')
const bcrypt = require('bcrypt');

const getRepartidores = async (req, res) => {
    try {
        const repartidores = await Repartidores.findAll();

        return res.status(200).json(repartidores);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidores.findByPk(
            Number(req.params.id)
        );

        if (!repartidor) {
            return res.status(404).json({
                mensaje: "Repartidor no encontrado"
            });
        }

        return res.status(200).json(repartidor);

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const postAgregarRepartidor = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const {nombre, apellido, email, telefono, contraseña, fecha_nacimiento, genero, nacionalidad, vehiculo, fecha_emision, tipo_licencia} = req.body;

        
        if (!nombre || !apellido || !email || !telefono || !contraseña || !fecha_nacimiento || !genero  || !nacionalidad || !vehiculo || !fecha_emision || !tipo_licencia) {
            await t.rollback();
            return res.status(400).json({ message: "Faltan parámetros obligatorios" });
        }

        const usuario = await Usuarios.findOne({ 
            where: { email },
            transaction: t 
        });

        if (usuario) {
            await t.rollback();
            return res.status(409).json({ message: "Este email ya se encuentra registrado" });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 12);

        const nuevo_usuario = await Usuarios.create({
            nombre,
            apellido,
            email,
            telefono,
            contraseña: hashedPassword,
            fecha_nacimiento,
            genero,
            isActive: true
        }, { transaction: t });

        const nuevo_repartidor = await Repartidores.create({
            estado: true,
            nacionalidad,
            vehiculo,
            Id_Usuario: nuevo_usuario.id 
        }, { transaction: t });

        const nueva_licencia = await LicenciasConducir.create({
            fecha_emision,
            fecha_registro: Date.now(),
            Tipo: tipo_licencia,
            ID_Repartidor: nuevo_repartidor.id 
        }, { transaction: t });

        
        await t.commit();

        return res.status(201).json({
            message: "Repartidor, usuario y licencia registrados exitosamente", usuarioId: nuevo_usuario.id, repartidorId: nuevo_repartidor.id, licenciaId: nueva_licencia.id});

    } catch (error) {
        await t.rollback();
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "Ya existe un registro con datos únicos duplicados." });
        }
        console.log(error)
        return res.status(500).json({error: error.message});
    }
}

const patchModificarRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidores.findByPk(
            Number(req.params.id)
        );

        if (!repartidor) {
            return res.status(404).json({
                mensaje: "Repartidor no encontrado"
            });
        }

        const {
            nombre,
            estado,
            nacionalidad,
            vehiculo,
            ID_Licencia
        } = req.body;

        await repartidor.update({
            nombre,
            estado,
            nacionalidad,
            vehiculo,
            ID_Licencia
        });

        return res.status(200).json({
            mensaje: "Repartidor modificado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const deleteBorrarRepartidor = async (req, res) => {
    try {
        const repartidor = await Repartidores.findByPk(
            Number(req.params.id)
        );

        if (!repartidor) {
            return res.status(404).json({
                mensaje: "Repartidor no encontrado"
            });
        }

        await repartidor.destroy();

        return res.status(200).json({
            mensaje: "Repartidor borrado correctamente"
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    getRepartidores,
    getRepartidor,
    postAgregarRepartidor,
    patchModificarRepartidor,
    deleteBorrarRepartidor
};