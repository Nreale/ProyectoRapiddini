const { calcularDVH } = require('./DVH');

const usuario1 = { nombre: 'Carlos', email: 'carlos@mail.com', rol: 'Vendedor' };
const usuario2 = { rol: 'Vendedor', nombre: 'Carlos', email: 'carlos@mail.com' };
const usuarioModificado = { nombre: 'Carlitos', email: 'carlos@mail.com', rol: 'Vendedor' };

const hash1 = calcularDVH(usuario1);
const hash2 = calcularDVH(usuario2);
const hashModificado = calcularDVH(usuarioModificado);

console.log("--- RESULTADOS DE LA PRUEBA ---");
console.log("Hash 1:", hash1);
console.log("Hash 2:", hash2);
console.log("Hash Modificado:", hashModificado);

console.log("¿Funcionó el orden (Hash 1 == Hash 2)?:", hash1 === hash2 ? "¡SÍ!" : "¡NO!");
console.log("¿Detectó el cambio (Hash 1 != Modificado)?:", hash1 !== hashModificado ? "¡SÍ!" : "¡NO!");