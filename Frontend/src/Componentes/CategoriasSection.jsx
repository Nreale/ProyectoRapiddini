import React, { useState } from "react";
import { useEffect } from 'react'
import CategoriaCard from "./CategoriaCard";
import "./CategoriasSection.css";
import axios from "axios";

function CategoriasSection() {
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)

  const BuscarCategorias = async (e) => {
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/Categorias/ObtenerCategorias')
      const categoriasLimitadas = response.data.categorias.slice(0, 8);
      setCategorias(categoriasLimitadas);
      console.log(categoriasLimitadas);
    } catch (error) {
      console.error("Error en la petición:", error);
      if (error.response && error.response.data) {
          const mensajeError = error.response.data.message || "Error al registrarse";
          setError(mensajeError);
      }
    }
  }

  useEffect(()=>{
    BuscarCategorias()
  },[])

  return (
    <div className="categorias-section">
      <h2 className="categorias-section__title">Categorias productos</h2>
      <div className="categorias-grid">
        {categorias.length > 0 ? (
          categorias.map((cat) => (
            <CategoriaCard 
            key={cat.id} 
            titulo={cat.nombre} 
            descripcion={cat.descripcion}
            imagen={cat.imagen}/>
        ))
      ) : (
        <p className="categorias-vacio">No hay categorías para mostrar.</p>
      )}
      </div>
    </div>
  );
}

export default CategoriasSection;