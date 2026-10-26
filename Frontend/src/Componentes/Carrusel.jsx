import React from 'react';
import './Carrusel.css';

const Carrusel = ({ titulo, locales = [] }) => {
    return (
        <div className="carrusel-container">
            <h2 className="carrusel-titulo">{titulo}</h2>
            <div className="carrusel-grid">
                {locales.length > 0 ? (
                    locales.map((local) => (
                        <div 
                            key={local.id} 
                            className={`local-card ${local.imagen ? 'con-imagen' : ''}`} 
                            style={local.imagen ? { 
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${local.imagen})` 
                            } : {}}
                        >
                            <div className="local-info">
                                <h3 className="local-nombre">{local.nombre}</h3>
                                <p className="local-telefono">
                                  {local.telefono || 'Sin teléfono'}
                                </p>
                                <span className={`local-estado ${local.estado ? 'activo' : 'inactivo'}`}>
                                    {local.estado ? 'Abierto / Disponible' : 'Cerrado'}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="carrusel-vacio">No hay locales para mostrar.</p>
                )}
            </div>
        </div>
    );
};

export default Carrusel;