import React, { useState } from "react";
import { useEffect } from 'react'
import axios from "axios";
import "./HomeVendedor.css";
const LOCALES_DE_PRUEBA = [
    {
        id: 1,
        nombre: "Pizzería Don Remolo",
        telefono: "+54 11 4444-5555",
        estado: true,
        imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        nombre: "Burgers & Co",
        telefono: "+54 11 8888-9999",
        estado: true,
        imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        nombre: "Sushi Roll Master",
        telefono: "+54 11 2222-3333",
        estado: false,
        imagen: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=150&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        nombre: "Heladería Polar",
        telefono: "+54 11 7777-1111",
        estado: true,
        imagen: "https://images.unsplash.com/photo-1567206563064-6f60f4078b57?w=150&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        nombre: "Empanadas El Tío",
        telefono: "+54 11 3333-4444",
        estado: false,
        imagen: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=150&auto=format&fit=crop&q=60"
    }
];


const HomeVendedor = () => {
    const [error, setError] = useState(null)
    const [locales, setLocales] = useState(LOCALES_DE_PRUEBA)
    const [localSeleccionado, setLocalSeleccionado] = useState(LOCALES_DE_PRUEBA[0]);
    const [mensaje, setMensaje] = useState('')
    const BuscarLocales = async (e) => {
        setError(null);
        try {

            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
            const response = await axios.get('http://localhost:3000/Locales/ObtenerLocales', {
                headers: {
                    authorization: token
                }
            })
            
            if (response?.data?.locales) {
                setLocales(response.data.locales)

                if (response.data.locales.length > 0) {
                    setLocalSeleccionado(response.data.locales[0]);
                }
            }
            


        } catch (error) {
            console.error("Error en la petición:", error);
            if (error.response && error.response.data) {
                const mensajeError = error.response.data.message || "Error al registrarse";
                setError(mensajeError);
            }
        }
    }
    useEffect(()=> {
        
    }, [])
    
    return (
        <>
            <div className="home-vendedor__page">
                
                <section className="home-vendedor__section">
                    <h2>ELIJE TU LOCAL</h2>
                    <div className="home-vendedor__line">

                    </div>
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

                </div>
            </div>
        </>
        
    );
};

export default HomeVendedor;