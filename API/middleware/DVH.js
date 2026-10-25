const crypto = require('crypto');

function calcularDVH(datos) {
    const keys = Object.keys(datos).sort();
    
    let cadenaConcatenada = '';
    for (const key of keys) {
        if (key !== 'dvh' && datos[key] !== undefined && datos[key] !== null) {
            cadenaConcatenada += `${key}:${datos[key]}|`;
        }
    }

    const hash = crypto
        .createHash('sha256')
        .update(cadenaConcatenada)
        .digest('hex');
    
    return hash;
}

module.exports = { calcularDVH };