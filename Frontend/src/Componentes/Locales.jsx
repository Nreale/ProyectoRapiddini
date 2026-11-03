import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Locales.css";

const DetalleLocal = () => {
    const { nombre } = useParams();
    const [local, setLocal] = useState(null);
    const [error, setError] = useState(null);

    const obtenerDetalleLocal = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/Locales/BuscarLocal/${nombre}`);
            setLocal(response.data.data);
        } catch (error) {
            console.error("Error al obtener el local:", error);
            setError("No se pudo cargar la información del local.");
        }
    };

    useEffect(() => {
        obtenerDetalleLocal();
    }, [nombre]);

    if (error) return <p className="error-msg">{error}</p>;
    if (!local) return <p className="loading-msg">Cargando local...</p>;

    return (
        <div className="detalle-local-container">
            <div className="detalle-local__info-section">
                <div className="detalle-local__header">
                    <h1>{local.nombre}</h1>
                    <div className="subrayado"></div>
                    <p className="descripcion">
                        {local.descripcion || "Bienvenido a nuestro local. Aquí encontrarás los mejores productos y atención personalizada."}
                    </p>
                    <p className="telefono"> Teléfono: {local.telefono}</p>
                </div>

                <div className="detalle-local__catalogo">
                    <h3>Catálogo de Productos</h3>
                    <div className="catalogo-grid">
                        {local.Productos && local.Productos.length > 0 ? (
                            local.Productos.map((prod) => (
                                <div key={prod.id} className="producto-item">
                                    <h4>{prod.nombre}</h4>
                                    <span className="precio">${prod.precio}</span>
                                </div>
                            ))
                        ) : (
                            <p className="sin-productos">Este local aún no tiene productos registrados en su catálogo.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="detalle-local__image-section">
                <img 
                    src={local.imagen ? `http://localhost:3000${local.imagen}` : "https://via.placeholder.com/600"} 
                    alt={local.nombre} 
                />
            </div>
        </div>
    );
};

export default DetalleLocal;