const { Direcciones } = require('../models/index.js');

const getDirecciones = async (req, res) => {
  try {
    const direcciones = await Direccion.findAll();
    res.json(direcciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las direcciones', error: error.message });
  }
};

const getDireccion = async (req, res) => {
  try {
    const direccion = await Direccion.findByPk(req.params.id);
    if (!direccion) {
      return res.status(404).json({ mensaje: 'Dirección no encontrada' });
    }
    res.json(direccion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la dirección', error: error.message });
  }
};

const crearDireccion = async (req, res) => {
  try {
    const { calle, numero, id_usuario, edificio, timbre } = req.body;

    if (!calle || calle.length > 50) {
      return res.status(400).json({ mensaje: 'Calle es obligatoria y debe tener hasta 50 caracteres' });
    }
    if (!numero || numero.toString().length > 4) {
      return res.status(400).json({ mensaje: 'Numero es obligatorio y debe tener hasta 4 caracteres' });
    }
    if (!id_usuario) {
      return res.status(400).json({ mensaje: 'ID_Usuario es obligatorio' });
    }
    if (typeof edificio !== 'boolean') {
      return res.status(400).json({ mensaje: 'Edificio debe ser true o false' });
    }
    if (timbre === undefined || timbre.toString().length > 2) {
      return res.status(400).json({ mensaje: 'Timbre es obligatorio y debe tener hasta 2 dígitos' });
    }

    const nuevaDireccion = await Direccion.create({ calle, numero, id_usuario, edificio, timbre });
    res.status(201).json(nuevaDireccion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la dirección', error: error.message });
  }
};

const actualizarDireccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { calle, numero, id_usuario, edificio, timbre } = req.body;

    const direccion = await Direccion.findByPk(id);
    if (!direccion) {
      return res.status(404).json({ mensaje: 'Dirección no encontrada' });
    }

    await direccion.update({ calle, numero, id_usuario, edificio, timbre });
    res.json({ mensaje: 'Dirección actualizada correctamente', direccion });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la dirección', error: error.message });
  }
};

const eliminarDireccion = async (req, res) => {
  try {
    const { id } = req.params;

    const direccion = await Direccion.findByPk(id);
    if (!direccion) {
      return res.status(404).json({ mensaje: 'Dirección no encontrada' });
    }

    await direccion.destroy();
    res.json({ mensaje: 'Dirección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la dirección', error: error.message });
  }
};

module.exports = {
  getDirecciones,
  getDireccion,
  crearDireccion,
  actualizarDireccion,
  eliminarDireccion
};