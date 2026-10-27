const crypto = require('crypto');
const { sequelize } = require('../config/db');

/**
 * Calcula y actualiza el DVV (Dígito Verificador Vertical) para una tabla específica.
 * @param {string} nombreTabla - Nombre físico de la tabla en la BD.
 * @param {Object} modeloSequelize - El modelo de Sequelize correspondiente.
 */
const actualizarDVV = async (nombreTabla, modeloSequelize) => {
    try {
        // 1. Traer todos los DVH de la tabla ordenados por ID para mantener consistencia
        const registros = await modeloSequelize.findAll({
            attributes: ['dvh'],
            order: [['id', 'ASC']]
        });

        // 2. Concatenar todos los hashes de las filas
        const cadenaHashes = registros.map(r => r.dvh || '').join('');

        // 3. Generar el hash maestro (DVV)
        const dvvHash = crypto.createHash('sha256').update(cadenaHashes).digest('hex');

        // 4. Guardar o actualizar en la tabla de control global 'control_dvv'
        const query = `
            INSERT INTO control_dvv (tabla, dvv) 
            VALUES (:tabla, :dvv)
            ON DUPLICATE KEY UPDATE dvv = :dvv;
        `;

        await sequelize.query(query, {
            replacements: { tabla: nombreTabla, dvv: dvvHash }
        });

        console.log(`[DVV] Actualizado con éxito para la tabla: ${nombreTabla}`);
        return dvvHash;
    } catch (error) {
        console.error(`[DVV Error] Error al calcular el DVV para ${nombreTabla}:`, error);
        throw error;
    }
};

/**
 * Verifica si el DVV actual coincide con la suma de los DVH de la tabla.
*/
const verificarDVV = async (nombreTabla, modeloSequelize) => {
    try {
        // 1. Calcular el DVV real actual en base a los datos
        const registros = await modeloSequelize.findAll({
            attributes: ['dvh'],
            order: [['id', 'ASC']]
        });
        const cadenaHashes = registros.map(r => r.dvh || '').join('');
        const dvvCalculado = crypto.createHash('sha256').update(cadenaHashes).digest('hex');

        // 2. Buscar el DVV guardado en la tabla de control
        const [resultado] = await sequelize.query(
            `SELECT dvv FROM control_dvv WHERE tabla = :tabla`,
            { replacements: { tabla: nombreTabla } }
        );

        if (!resultado.length) {
            return { integro: false, mensaje: 'No hay registro de DVV para esta tabla.' };
        }

        const dvvGuardado = resultado[0].dvv;

        // 3. Comparar
        const esIntegro = dvvCalculado === dvvGuardado;
        return {
            integro: esIntegro,
            mensaje: esIntegro ? 'Íntegro' : '¡Alerta! Incoherencia detectada en la tabla (posible manipulación de datos).'
        };
    } catch (error) {
        console.error(`[DVV Error] Error al verificar ${nombreTabla}:`, error);
        throw error;
    }
};

module.exports = {
    actualizarDVV,
    verificarDVV
};