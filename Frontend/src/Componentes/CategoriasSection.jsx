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
      setCategorias(response.data.categorias)
      console.log(response.data.categorias)
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
      <div className="categorias-grid">
        {categorias.map((cat) => (
          <CategoriaCard key={cat.id} titulo={cat.nombre} />
        ))}
      </div>
    </div>
  );
}

export default CategoriasSection;