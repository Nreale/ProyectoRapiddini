import React from "react";
import "./CategoriaCard.css";

function CategoriaCard({ nombre, descripcion, imagen }) {
  return (
    <div 
      className={`categoria-card ${imagen ? 'con-imagen' : ''}`}
      style={imagen ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imagen})` } : {}}>
      <div className="categoria-card__content">
        {nombre && <h3 className="categoria-card__title">{nombre}</h3>}
        {descripcion && <p className="categoria-card__description">{descripcion}</p>}
      </div>
    </div>
  );
}

export default CategoriaCard;