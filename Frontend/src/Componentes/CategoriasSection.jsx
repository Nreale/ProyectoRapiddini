import React from "react";
import CategoriaCard from "./CategoriaCard";
import "./CategoriasSection.css";

function CategoriasSection() {
  const categorias = [
    { id: 1, titulo: "Categoría 1" },
    { id: 2, titulo: "Categoría 2" },
    { id: 3, titulo: "Categoría 3" },
    { id: 4, titulo: "Categoría 4" },
  ];

  return (
    <div className="categorias-section">
      <div className="categorias-grid">
        {categorias.map((cat) => (
          <CategoriaCard key={cat.id} titulo={cat.titulo} />
        ))}
      </div>
    </div>
  );
}

export default CategoriasSection;