import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductoCard from "./ProductoCard";
import "./ProductosCards.css";

function ProductosCards() {
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [error, setError] = useState(null);
  const [Usuario, setUsuario] = useState(null)

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Producto/ObtenerProductos");
        const dataProductos = response.data.productos || response.data || [];
        setProductos(dataProductos);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("No se pudieron cargar los productos.");
      }
    };
    obtenerProductos();
  }, []);

  const handleAgregarAlCarrito = async (producto, cantidadSeleccionada) => {
    const cantidadFinal = cantidadSeleccionada || 1;
    const idProductoReal = producto.Id_Producto || producto.id;
    const nuevoTotal = cantidadSeleccionada*producto.precio

    try {
        const token = localStorage.getItem("token"); 
        
        const resPedido = await axios.get("http://localhost:3000/Pedidos/Carrito", {
          headers: {authorization: token }
        });
        const idPedidoActivo = resPedido.data.id; 
        const totalActual = parseFloat(resPedido.data.total);
        const nuevoTotalCalculado = totalActual + nuevoTotal;

        const response = await axios.post("http://localhost:3000/Carrito/CrearCarrito", {
            Id_Producto: idProductoReal,
            Id_Pedido: idPedidoActivo,
            cantidad: cantidadFinal
        });

        await axios.put(`http://localhost:3000/Pedidos/${idPedidoActivo}/estado`, {
            total: nuevoTotalCalculado
        });

        if (response.status === 201 || response.status === 200) {
            alert("¡Producto agregado al carrito con éxito!");
        }
    } catch (err) {
        console.error("Error al agregar al carrito:", err);
        alert("Hubo un error al agregar el producto.");
    }
};

  return (
    <div className="lista-productos-container">
      <h2>Nuestros Productos</h2>
      {error && <p className="error-msg">{error}</p>}

      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map((prod) => {
            const idProd = prod.Id_Producto || prod.id;
            const cantActual = cantidades[idProd] || 1;

            return (
              <ProductoCard 
                key={idProd} 
                producto={prod} 
                cantidad={cantActual}
                onCambiarCantidad={(delta) => handleCambiarCantidad(idProd, delta)}
                onAgregarAlCarrito={handleAgregarAlCarrito} 
              />
            );
          })
        ) : (
          !error && <p>No hay productos cargados todavía.</p>
        )}
      </div>
    </div>
  );
}

export default ProductosCards;