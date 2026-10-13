import React from "react";
import "./CategoriaCard.css";

function CategoriaCard({ titulo }) {
  return (
    <div className="categoria-card">
      <div className="categoria-card__image-placeholder"></div>
      {titulo && <span className="categoria-card__title">{titulo}</span>}
    </div>
  );
}

export default CategoriaCard;