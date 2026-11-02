import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeVendedor.css";

const HomeVendedor = () => {
    const [error, setError] = useState(null);
    const [locales, setLocales] = useState([]);
    const [localSeleccionado, setLocalSeleccionado] = useState(null);


    const BuscarLocalesConEstadisticas = async () => {
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.get('http://localhost:3000/Locales/ObtenerLocalesByVendedor', {
                headers: { authorization: token }
            });
            
            if (response?.data?.locales) {
                const listaLocales = response.data.locales;
                setLocales(listaLocales);

                
                if (listaLocales.length > 0) {
                    setLocalSeleccionado(listaLocales[0]);
                }
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Error al cargar los datos");
            }
        }
    };

    useEffect(() => {
        BuscarLocalesConEstadisticas();
    }, []);

    return (
        <div className="home-vendedor__page">
            <section className="home-vendedor__section">
                <h2>ELIJE TU LOCAL</h2>
                <div className="home-vendedor__line"></div>
                <div className="home-vendedor__icons-local">
                    {locales.length > 0 ? (
                        locales.map((local) => (
                            <div 
                                key={local.id}
                                className={`local-icono-item ${localSeleccionado?.id === local.id ? 'activo' : ''}`}
                                onClick={() => setLocalSeleccionado(local)}
                            >
                                <div className="local-icono-img-container">
                                    <img 
                                        src={local.imagen || "https://via.placeholder.com/60"} 
                                        alt={local.nombre} 
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="home-vendedor__sin-locales">No tienes locales registrados.</p>
                    )}
                </div>
            </section>

            <div className="home-vendedor__local">
                {localSeleccionado ? (
                    <div className="vendedor-dashboard">
                        <div className="vendedor-dashboard__top">
                            <div className="vendedor-card vendedor-card--stats">
                                <div className="vendedor-card__header">
                                    <h3>Métricas & Información - {localSeleccionado.nombre}</h3>
                                </div>
                                <div className="vendedor-table-container">
                                    <table className="vendedor-table">
                                        <thead>
                                            <tr>
                                                <th>Métrica</th>
                                                <th>Valor del Mes</th>
                                                <th>Estado Actual</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>    
                                                <td><strong>Pedidos Totales</strong></td>
                                                <td>{localSeleccionado.ventasMes || 0} envíos</td>
                                                <td><span className="badge badge--success">Activo</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Ingresos Brutos</strong></td>
                                                <td>{localSeleccionado.ingresos || '$0'}</td>
                                                <td><span className="badge badge--success">Facturación</span></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Teléfono Oficial</strong></td>
                                                <td>{localSeleccionado.telefono}</td>
                                                <td>
                                                    <span className={`badge ${localSeleccionado.estado ? 'badge--success' : 'badge--danger'}`}>
                                                        {localSeleccionado.estado ? 'Abierto' : 'Cerrado'}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="vendedor-card vendedor-card--sucursales">
                                <div className="vendedor-card__header">
                                    <h3>Sucursales</h3>
                                </div>
                                <div className="vendedor-sucursales__list">
                                    {localSeleccionado.Sucursales && localSeleccionado.Sucursales.length > 0 ? (
                                        localSeleccionado.Sucursales.map((sucursal) => (
                                            <div key={sucursal.id} className="sucursal-item">
                                                <div className="sucursal-item__info">
                                                    <h4>{sucursal.nombre}</h4>
                                                    <p>{sucursal.direccion}</p>
                                                </div>
                                                <span className={`sucursal-item__status ${sucursal.estado === 'Abierta' ? 'abierta' : 'cerrada'}`}>
                                                    {sucursal.estado}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="vendedor-empty-text">Sin sucursales registradas.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="vendedor-dashboard__bottom">
                            <div className="vendedor-card__header">
                                <h3>Administración de Productos</h3>
                                <button className="btn-add-product">+ Nuevo Producto</button>
                            </div>
                            
                            <div className="vendedor-productos__grid">
                                {localSeleccionado.Productos && localSeleccionado.Productos.length > 0 ? (
                                    localSeleccionado.Productos.map((prod) => (
                                        <div key={prod.id} className="producto-card-rect">
                                            <div className="producto-card-rect__info">
                                                <h4>{prod.nombre}</h4>
                                                <div className="producto-card-rect__details">
                                                    <span className="price">${prod.precio}</span>
                                                    <span className="stock">Stock: {prod.stock || 0} un.</span>
                                                </div>
                                            </div>
                                            <div className="producto-card-rect__actions">
                                                <button className="btn-action btn-action--edit">Editar</button>
                                                <button className={`btn-action ${prod.activo ? 'btn-action--pause' : 'btn-action--enable'}`}>
                                                    {prod.activo ? 'Activo' : 'Desactivado'}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="vendedor-empty-text">No hay productos dados de alta en este local.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default HomeVendedor;