import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductoCard from "./ProductoCard";
import "./ProductosCards.css"; // O el CSS que uses para la grilla

function ProductosCards() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Producto/ObtenerProductos");
        
        // Verificamos qué trae la respuesta por si la BDD de tu amigo está vacía
        const dataProductos = response.data.productos || response.data || [];
        setProductos(dataProductos);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("No se pudieron cargar los productos o la base de datos está vacía.");
      }
    };

    obtenerProductos();
  }, []);

  const manejarAgregarAlCarrito = (producto, cantidad) => {
    console.log("Producto agregado:", producto.nombre, "Cantidad:", cantidad);
  };

  return (
    <div className="lista-productos-container">
      <h2>Nuestros Productos</h2>

      {error && <p className="error-msg">{error}</p>}

      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map((prod) => (
            <ProductoCard 
              key={prod._id || prod.id} 
              producto={prod} 
              onAgregarAlCarrito={manejarAgregarAlCarrito} 
            />
          ))
        ) : (
          !error && <p>No hay productos cargados en la base de datos todavía.</p>
        )}
      </div>
    </div>
  );
}

export default ProductosCards;